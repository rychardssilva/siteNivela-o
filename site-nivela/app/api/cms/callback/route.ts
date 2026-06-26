import { NextRequest, NextResponse } from "next/server";

const githubTokenUrl = "https://github.com/login/oauth/access_token";

function getGithubClientId() {
  return process.env.GITHUB_CLIENT_ID;
}

function getGithubClientSecret() {
  return process.env.GITHUB_CLIENT_SECRET;
}

function buildCallbackUrl(request: NextRequest) {
  return new URL("/api/cms/callback?provider=github", request.url).toString();
}

function buildCallbackHtml(token: string) {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Autenticando o CMS</title>
  </head>
  <body>
    <script>
      (function () {
        const token = ${JSON.stringify(token)};

        function receiveMessage() {
          window.opener.postMessage('authorization:github:success:' + JSON.stringify({ token }), '*');
          window.removeEventListener('message', receiveMessage, false);
          window.close();
        }

        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;
}

export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get("provider");
  const code = request.nextUrl.searchParams.get("code");
  const returnedState = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("decap_oauth_state")?.value;
  const clientId = getGithubClientId();
  const clientSecret = getGithubClientSecret();

  if (provider !== "github") {
    return NextResponse.json({ error: "Invalid provider." }, { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variables." },
      { status: 500 },
    );
  }

  if (!code || !returnedState || !expectedState || returnedState !== expectedState) {
    return NextResponse.json({ error: "Invalid OAuth callback." }, { status: 400 });
  }

  const tokenResponse = await fetch(githubTokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: buildCallbackUrl(request),
      state: returnedState,
    }),
  });

  const tokenPayload: { access_token?: string; error?: string; error_description?: string } =
    await tokenResponse.json();

  if (!tokenResponse.ok || !tokenPayload.access_token) {
    return NextResponse.json(
      {
        error: tokenPayload.error ?? "Unable to exchange the authorization code for a token.",
        description: tokenPayload.error_description ?? null,
      },
      { status: 500 },
    );
  }

  const response = new NextResponse(buildCallbackHtml(tokenPayload.access_token), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

  response.cookies.set("decap_oauth_state", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/api/cms",
    maxAge: 0,
  });

  return response;
}