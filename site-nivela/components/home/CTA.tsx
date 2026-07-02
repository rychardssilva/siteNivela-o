import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta-band">
      <h2>
        Tem um imóvel e precisa de <em>certeza técnica?</em> Fale com a Nivela.
      </h2>

      <div className="cta-btns">
        <Link href="/contato" className="btn-whatsapp">
          WhatsApp
        </Link>

        <Link href="/contato" className="btn-gold">
          Avaliação Técnica
        </Link>
      </div>
    </section>
  );
}
