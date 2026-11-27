import { Camera, Clock3, Mail, MessageCircle } from "lucide-react";

export function HelpChannels() {
  return (
    <section id="canais" className="help-channels" aria-labelledby="channels-title">
      <div className="help-wrap help-section help-split">
        <div>
          <p className="help-label">Canais de atendimento</p>
          <h2 id="channels-title">Converse com <em>a gente.</em></h2>
          <p className="help-copy">Estamos preparando nossos canais. Os contatos, os horários e a previsão de resposta serão divulgados aqui.</p>
        </div>
        <div className="help-channel-directory">
          <div id="whatsapp" className="help-channel help-channel-primary">
            <MessageCircle size={26} strokeWidth={1.5} aria-hidden="true" />
            <div><h3>WhatsApp</h3><p>Canal principal · Número a divulgar</p></div>
          </div>
          <ul>
            <li className="help-channel">
              <Mail size={21} strokeWidth={1.5} aria-hidden="true" />
              <div><h3>E-mail</h3><p>Endereço a divulgar</p></div>
            </li>
            <li className="help-channel">
              <Camera size={21} strokeWidth={1.5} aria-hidden="true" />
              <div><h3>Instagram</h3><p>Perfil oficial a divulgar</p></div>
            </li>
          </ul>
          <div className="help-hours">
            <Clock3 size={19} strokeWidth={1.5} aria-hidden="true" />
            <dl>
              <div><dt>Horários</dt><dd>A divulgar</dd></div>
              <div><dt>Previsão de resposta</dt><dd>A divulgar</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
