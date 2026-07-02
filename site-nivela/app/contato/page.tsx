const methods = [
  {
    icon: "WA",
    title: "WhatsApp (preferencial)",
    description:
      "Resposta rápida para dúvidas e agendamentos. Clique para iniciar conversa.",
  },
  {
    icon: "EM",
    title: "E-mail",
    description:
      "Para envio de documentos e solicitações formais. Respondemos em até 24h úteis.",
  },
  {
    icon: "RJ",
    title: "Área de atendimento",
    description:
      "Região metropolitana do Rio de Janeiro com planos de expansão nacional.",
  },
];

export default function ContatoPage() {
  return (
    <main>
      <section className="sobre-hero">
        <span className="section-label">Fale conosco</span>
        <h1>Vamos conversar sobre o seu imóvel</h1>
        <p>
          Seja por WhatsApp, e-mail ou formulário. Escolha como prefere.
          Respondemos todas as mensagens com atenção e sem pressa.
        </p>
      </section>

      <section className="section contact-page-section">
        <div className="contato-grid">
          <div className="contato-info">
            <h2>Como chegar até nós</h2>
            <p>
              Atendemos proprietários de imóveis, pequenas construtoras e
              advogados na região de atuação. Para dúvidas sobre qual serviço é
              o correto, basta perguntar. Orientamos sem custo.
            </p>

            {methods.map((method) => (
              <article className="contact-method" key={method.title}>
                <div className="contact-method-icon" aria-hidden="true">
                  {method.icon}
                </div>
                <div>
                  <h3>{method.title}</h3>
                  <p>{method.description}</p>
                </div>
              </article>
            ))}
          </div>

          <form className="form-card">
            <h2>Envie uma mensagem</h2>

            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input id="name" type="text" placeholder="Seu nome completo" />
            </div>

            <div className="form-group">
              <label htmlFor="contact">E-mail ou WhatsApp</label>
              <input
                id="contact"
                type="text"
                placeholder="Como prefere receber retorno?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <select id="subject" defaultValue="Orçamento">
                <option>Orçamento</option>
                <option>Dúvida técnica</option>
                <option>Parceria</option>
                <option>Outro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                placeholder="Descreva sua necessidade..."
              />
            </div>

            <button className="form-submit" type="submit">
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
