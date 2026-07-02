import Link from "next/link";

import { getCmsPage } from "@/lib/pages";

export default function AvaliacaoTecnicaPage() {
  const cmsPage = getCmsPage("avaliacao-tecnica");

  return (
    <main>
      <section className="sobre-hero">
        <span className="section-label">Avaliação técnica</span>
        <h1>{cmsPage?.title ?? "Avaliação técnica do seu imóvel"}</h1>
        <p>
          {cmsPage?.description ||
            "Entenda a situação técnica do imóvel antes de decidir, regularizar, construir ou negociar."}
        </p>
      </section>

      <section className="section cms-page-section">
        {cmsPage?.body ? (
          <div
            className="cms-content"
            dangerouslySetInnerHTML={{ __html: cmsPage.html }}
          />
        ) : (
          <div className="cms-content">
            <p>
              Solicite uma análise inicial para entender documentos, limites,
              área real e próximos passos técnicos.
            </p>
          </div>
        )}
      </section>

      <section className="cta-band">
        <h2>
          Quer clareza antes de tomar uma <em>decisão patrimonial?</em>
        </h2>
        <div className="cta-btns">
          <Link href="/contato" className="btn-whatsapp">
            WhatsApp
          </Link>
          <Link href="/contato" className="btn-gold">
            Solicitar Avaliação
          </Link>
        </div>
      </section>
    </main>
  );
}
