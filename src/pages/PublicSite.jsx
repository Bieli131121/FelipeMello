import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ListingSection from '../components/ListingSection'
import Modal from '../components/Modal'
import { useState } from 'react'
import styles from './PublicSite.module.css'

const FOTO_FELIPE = '/felipe.jpg' // Coloque a foto em public/felipe.jpg

export default function PublicSite({ imoveis, onAdmClick, toast }) {
  const [contactModal, setContactModal] = useState(null)
  const [contactForm, setContactForm]   = useState({ nome: '', tel: '', msg: '' })

  const handleContact = (imovel) => {
    setContactForm({ nome: '', tel: '', msg: `Olá! Tenho interesse no imóvel: ${imovel.titulo || imovel.tipo} — ${imovel.bairro}, ${imovel.cidade}` })
    setContactModal(imovel)
  }

  const handleSendContact = () => {
    const { msg } = contactForm
    const text = encodeURIComponent(msg)
    window.open(`https://wa.me/5548991651257?text=${text}`, '_blank')
    setContactModal(null)
    toast('✅ Redirecionando para o WhatsApp!', 'success')
  }

  const disponiveis = imoveis.filter(i => i.status === 'Disponível')

  return (
    <div className={styles.site}>
      <Navbar onAdmClick={onAdmClick} />
      <Hero onSearch={() => {}} />
      <ListingSection imoveis={disponiveis} onContact={handleContact} />

      {/* Sobre */}
      <section id="sobre" className={styles.sobre}>
        <div className={styles.sobreContainer}>
          <div className={styles.sobreContent}>
            <span className={styles.tag}>Quem somos</span>
            <h2>Experiência e <em>dedicação</em> no mercado imobiliário</h2>
            <p>
              Felipe Pereira de Mello, natural de Porto Alegre, RS. Corretor de imóveis há 18 anos
              atuando junto ao mercado imobiliário em Garopaba e região, tecnólogo em Negócios Imobiliários
              e perito avaliador CNAI 009132.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Vende e permuta áreas para loteamento, condomínios, imóveis prontos, terrenos e fazendas.
              Solicite uma busca personalizada por região e conheça as opções em fazendas, terrenos, lotes,
              casas, áreas para incorporação e projetos em andamento.
            </p>
            <div className={styles.sobreStats}>
              {[['18+','Anos de experiência'],['500+','Imóveis negociados'],['CNAI 009132','Perito Avaliador']].map(([n,l]) => (
                <div key={l}>
                  <span className={styles.sobreNum}>{n}</span>
                  <span className={styles.sobreLab}>{l}</span>
                </div>
              ))}
            </div>
            <div className={styles.sobreDiferenciais}>
              {['Excelência no Atendimento','Curadoria de Imóveis','Conhecimento de Mercado','Inovação e Tecnologia'].map(d => (
                <span key={d} className={styles.badge}>✓ {d}</span>
              ))}
            </div>
          </div>
          <div className={styles.sobreCard}>
            <img src={FOTO_FELIPE} alt="Felipe Mello" className={styles.fotoFelipe} />
            <h3>Felipe Mello</h3>
            <p>Corretor de Imóveis</p>
            <p style={{ fontSize: '0.82rem', marginTop: '0.4rem', opacity: 0.75 }}>CRECI-SC 16671 · CNAI 009132</p>
            <a
              href="https://wa.me/5548991651257"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center' }}
            >
              💬 Fale Comigo
            </a>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className={styles.servicos}>
        <div className={styles.servicosContainer}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className={styles.tag}>O que fazemos</span>
            <h2 className={styles.servicosTitle}>Nossos <em>Serviços</em></h2>
          </div>
          <div className={styles.servicosGrid}>
            {[
              { icon: '🏡', titulo: 'Comprar um Imóvel', desc: 'Curadoria especializada para você encontrar o imóvel perfeito em Garopaba, Imbituba e região.' },
              { icon: '🔄', titulo: 'Permutas', desc: 'Troque seu imóvel com segurança e avaliação justa. Temos imóveis disponíveis para permuta.' },
              { icon: '📋', titulo: 'Anunciar Imóvel', desc: 'Anuncie com visibilidade e avaliação precisa para vender rápido e pelo melhor preço.' },
              { icon: '💰', titulo: 'Simulação de Financiamento', desc: 'Análise de crédito e simulação de financiamento para compra de imóveis com facilidade.' },
              { icon: '🌿', titulo: 'Áreas para Loteamento', desc: 'Especialistas em áreas de APP, fazendas, glebas e terrenos para incorporação imobiliária.' },
              { icon: '📊', titulo: 'Avaliação Imobiliária', desc: 'Laudos e avaliações imobiliárias com respaldo técnico do CNAI 009132.' },
            ].map(s => (
              <div key={s.titulo} className={styles.servicoCard}>
                <span className={styles.servicoIcon}>{s.icon}</span>
                <h4>{s.titulo}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className={styles.mvv}>
        <div className={styles.mvvGrid}>
          {[
            { icon: '🎯', titulo: 'Missão', texto: 'Facilitar a realização de sonhos e projetos de vida, oferecendo soluções imobiliárias seguras e transparentes.' },
            { icon: '🔭', titulo: 'Visão', texto: 'Ser referência no mercado, reconhecido pela excelência, ética e inovação no atendimento ao cliente.' },
            { icon: '💎', titulo: 'Valores', texto: 'Atuar com ética, transparência, foco no cliente e comprometimento com resultados de qualidade.' },
          ].map(m => (
            <div key={m.titulo} className={styles.mvvCard}>
              <span className={styles.mvvIcon}>{m.icon}</span>
              <h4>{m.titulo}</h4>
              <p>{m.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className={styles.contato}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className={styles.tag}>Contato</span>
          <h2 className={styles.contatoTitle}>Vamos <em>conversar?</em></h2>
          <p className={styles.contatoSub}>Entre em contato para busca personalizada ou tire suas dúvidas.</p>
        </div>
        <div className={styles.contatoGrid}>
          {[
            { icon: '📱', label: 'WhatsApp / Telefone', val: '(48) 99165-1257', href: 'https://wa.me/5548991651257' },
            { icon: '📧', label: 'E-mail', val: 'ibiraterra@gmail.com', href: 'mailto:ibiraterra@gmail.com' },
            { icon: '📍', label: 'Região de atuação', val: 'Garopaba & Imbituba — SC', href: null },
          ].map(c => (
            <div key={c.label} className={styles.contatoCard}>
              <span style={{ fontSize: '1.8rem' }}>{c.icon}</span>
              <div>
                <p className={styles.contatoLabel}>{c.label}</p>
                {c.href
                  ? <a href={c.href} target="_blank" rel="noopener noreferrer" className={styles.contatoVal}>{c.val}</a>
                  : <p className={styles.contatoVal}>{c.val}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.contatoSocial}>
          <a href="https://www.facebook.com/felipemelloimoveis/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>Facebook</a>
          <a href="https://www.instagram.com/felipemelloimoveis.com.br/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>Instagram</a>
          <a href="https://www.linkedin.com/in/felipe-mello-31584b33" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>LinkedIn</a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Felipe Mello Imóveis</p>
          <p>CRECI-SC 16671 · CNAI 009132</p>
          <p style={{ opacity: 0.5, fontSize: '0.75rem', marginTop: '0.5rem' }}>Garopaba & Imbituba — Santa Catarina</p>
          <p style={{ opacity: 0.4, fontSize: '0.7rem', marginTop: '0.25rem' }}>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Contact Modal */}
      {contactModal && (
        <Modal
          open
          onClose={() => setContactModal(null)}
          title="💬 Manifestar Interesse"
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setContactModal(null)}>Cancelar</button>
              <button className="btn btn-gold" onClick={handleSendContact}>📲 Enviar via WhatsApp</button>
            </>
          }
        >
          <div className="fgroup"><label>Seu Nome</label><input value={contactForm.nome} onChange={e => setContactForm(p => ({ ...p, nome: e.target.value }))} /></div>
          <div className="fgroup"><label>Telefone</label><input value={contactForm.tel} onChange={e => setContactForm(p => ({ ...p, tel: e.target.value }))} /></div>
          <div className="fgroup"><label>Mensagem</label><textarea value={contactForm.msg} rows={4} onChange={e => setContactForm(p => ({ ...p, msg: e.target.value }))} /></div>
        </Modal>
      )}
    </div>
  )
}
