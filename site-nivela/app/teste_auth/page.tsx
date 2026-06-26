import TesteAuthClient from "./teste_auth-client";

type TesteAuthPageProps = {
  searchParams?: Promise<{
    result?: string;
  }>;
};

export const metadata = {
  title: "Teste de autenticação",
};

export default async function TesteAuthPage({ searchParams }: TesteAuthPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const authenticated = resolvedSearchParams?.result === "success";

  return <TesteAuthClient authenticated={authenticated} />;
}