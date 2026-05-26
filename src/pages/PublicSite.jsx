import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ListingSection from '../components/ListingSection'
import Modal from '../components/Modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PublicSite.module.css'

export default function PublicSite({ imoveis, onAdmClick, toast }) {
  const [contactModal, setContactModal] = useState(null)
  const [contactForm, setContactForm]   = useState({ nome: '', tel: '', msg: '' })
  const navigate = useNavigate()

  const handleContact = (imovel) => {
    setContactForm({ nome: '', tel: '', msg: `Olá! Tenho interesse no imóvel: ${imovel.titulo || imovel.tipo} — ${imovel.bairro}, ${imovel.cidade}` })
    setContactModal(imovel)
  }

  const handleSendContact = () => {
    const { tel, msg } = contactForm
    const text = encodeURIComponent(msg)
    window.open(`https://wa.me/5548999999999?text=${text}`, '_blank')
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
              Felipe Mello Imóveis atua há mais de 18 anos em Garopaba, Imbituba e região,
              com foco em terrenos, casas de alto padrão, áreas rurais e imóveis de praia.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Nosso trabalho vai além da transação: oferecemos consultoria personalizada,
              análise de mercado e acompanhamento completo do processo de compra e venda.
            </p>
            <div className={styles.sobreStats}>
              {[['18+','Anos de experiência'],['500+','Imóveis negociados'],['SC','Especialistas na região']].map(([n,l]) => (
                <div key={l}>
                  <span className={styles.sobreNum}>{n}</span>
                  <span className={styles.sobreLab}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.sobreCard}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏡</p>
            <h3>Felipe Mello</h3>
            <p>Corretor de Imóveis</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>CRECI-SC 000000</p>
            <a
              href="https://wa.me/5548999999999"
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

      {/* Contato */}
      <section id="contato" className={styles.contato}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className={styles.tag}>Contato</span>
          <h2>Vamos <em>conversar?</em></h2>
          <p className={styles.contatoSub}>Entre em contato para busca personalizada ou tire suas dúvidas.</p>
        </div>
        <div className={styles.contatoGrid}>
          {[
            { icon: '📱', label: 'WhatsApp', val: '(48) 9 9999-9999', href: 'https://wa.me/5548999999999' },
            { icon: '📧', label: 'E-mail',   val: 'contato@felipemelloimoveis.com.br', href: 'mailto:contato@felipemelloimoveis.com.br' },
            { icon: '📍', label: 'Região',   val: 'Garopaba & Imbituba — SC', href: null },
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
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <p>© {new Date().getFullYear()} Felipe Mello Imóveis. Todos os direitos reservados.</p>
          <p style={{ opacity: 0.5, fontSize: '0.75rem', marginTop: '0.3rem' }}>Garopaba & Imbituba — Santa Catarina</p>
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
