import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { findBySlug, makeSlug, precoDisplay, statusClass, tipoEmoji, finalidadeLabel } from '../utils'
import { AMENIDADES } from '../data/constants'
import Modal from '../components/Modal'
import styles from './ImovelPage.module.css'

export default function ImovelPage({ imoveis, toast }) {
  const { slug }    = useParams()
  const navigate    = useNavigate()
  const imovel      = findBySlug(imoveis, slug)

  const [photoIdx, setPhotoIdx]       = useState(0)
  const [lightbox, setLightbox]       = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [form, setForm]               = useState({ nome: '', tel: '', msg: '' })

  if (!imovel) {
    return (
      <div className={styles.notFound}>
        <span className={styles.notFoundIcon}>🏚</span>
        <h2>Imóvel não encontrado</h2>
        <p>Este anúncio pode ter sido removido ou o link está incorreto.</p>
        <Link to="/" className="btn btn-gold">← Ver todos os imóveis</Link>
      </div>
    )
  }

  const {
    tipo, finalidade, cidade, bairro, titulo, desc,
    area_total, area_const, frente,
    quartos, suites, banheiros, vagas, ano, sol,
    valor_venda, valor_aluguel, iptu, condominio,
    permuta, financiamento, status, badge,
    amenidades = [], obs_int, fotos = [],
  } = imovel

  const preco     = precoDisplay(imovel)
  const emoji     = tipoEmoji(tipo)
  const amenLabel = amenidades.map(id => AMENIDADES.find(a => a.id === id)?.label).filter(Boolean)

  const openContact = () => {
    setForm({
      nome: '',
      tel: '',
      msg: `Olá Felipe! Tenho interesse no imóvel:\n"${titulo || tipo}" — ${bairro}, ${cidade} — SC\n\nGostaria de mais informações.`,
    })
    setContactOpen(true)
  }

  const sendWhatsApp = () => {
    const text = encodeURIComponent(form.msg)
    window.open(`https://wa.me/5548999999999?text=${text}`, '_blank')
    setContactOpen(false)
    toast('✅ Redirecionando para WhatsApp!', 'success')
  }

  // Share URL
  const shareUrl = window.location.href
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => toast('🔗 Link copiado!', 'gold'))
  }

  // Related imoveis (same city, different id)
  const related = imoveis
    .filter(im => im.id !== imovel.id && im.cidade === cidade && im.status === 'Disponível')
    .slice(0, 3)

  return (
    <div className={styles.page}>

      {/* ── TOP NAV ─────────────────────────────────────────────── */}
      <nav className={styles.topNav}>
        <Link to="/" className={styles.backBtn}>
          <span>←</span> Todos os imóveis
        </Link>
        <div className={styles.navBreadcrumb}>
          <Link to="/">Início</Link>
          <span>/</span>
          <Link to="/">Imóveis</Link>
          <span>/</span>
          <span>{titulo || tipo}</span>
        </div>
        <div className={styles.navActions}>
          <button className={styles.shareBtn} onClick={copyLink} title="Copiar link">🔗 Compartilhar</button>
        </div>
      </nav>

      <div className={styles.container}>

        {/* ── GALLERY ─────────────────────────────────────────────── */}
        <div className={styles.gallery}>
          {fotos.length > 0 ? (
            <>
              <div className={styles.galleryMain} onClick={() => setLightbox(true)}>
                <img src={fotos[photoIdx]} alt={titulo} />
                <div className={styles.galleryOverlay}>
                  <span>🔍 Ampliar</span>
                </div>
                {fotos.length > 1 && (
                  <>
                    <button
                      className={`${styles.galleryArrow} ${styles.galleryArrowLeft}`}
                      onClick={e => { e.stopPropagation(); setPhotoIdx(i => (i - 1 + fotos.length) % fotos.length) }}
                    >‹</button>
                    <button
                      className={`${styles.galleryArrow} ${styles.galleryArrowRight}`}
                      onClick={e => { e.stopPropagation(); setPhotoIdx(i => (i + 1) % fotos.length) }}
                    >›</button>
                  </>
                )}
                <div className={styles.galleryCounter}>{photoIdx + 1} / {fotos.length}</div>
              </div>
              {fotos.length > 1 && (
                <div className={styles.galleryThumbs}>
                  {fotos.map((src, i) => (
                    <div
                      key={i}
                      className={`${styles.galleryThumb} ${i === photoIdx ? styles.galleryThumbActive : ''}`}
                      onClick={() => setPhotoIdx(i)}
                    >
                      <img src={src} alt="" />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className={styles.galleryEmpty}>
              <span>{emoji}</span>
              <p>Fotos em breve</p>
            </div>
          )}
        </div>

        {/* ── MAIN LAYOUT ─────────────────────────────────────────── */}
        <div className={styles.layout}>

          {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
          <div className={styles.leftCol}>

            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerBadges}>
                {badge === 'Destaque' && <span className="badge-pill badge-destaque">Destaque</span>}
                {badge === 'Novo'     && <span className="badge-pill badge-venda">Novo</span>}
                {permuta              && <span className="badge-pill badge-permuta">Aceita Permuta</span>}
                <span className={`badge-pill ${finalidade === 'aluguel' ? 'badge-aluguel' : 'badge-venda'}`}>
                  {finalidadeLabel(finalidade)}
                </span>
                <span className={statusClass(status)}>{status}</span>
              </div>

              <h1 className={styles.title}>{titulo || `${tipo} em ${bairro}`}</h1>

              <div className={styles.location}>
                <span>📍</span>
                <span>{bairro}, {cidade} — Santa Catarina</span>
              </div>

              <p className={styles.tipo}>{tipo}</p>
            </div>

            {/* Specs strip */}
            {(area_total || quartos || banheiros || vagas) && (
              <div className={styles.specsStrip}>
                {area_total  && <SpecItem icon="📐" label="Área Total"  val={area_total} />}
                {area_const  && <SpecItem icon="🏗"  label="Construída" val={area_const} />}
                {quartos     && <SpecItem icon="🛏"  label="Quartos"    val={quartos} />}
                {suites      && <SpecItem icon="⭐"  label="Suítes"     val={suites} />}
                {banheiros   && <SpecItem icon="🚿"  label="Banheiros"  val={banheiros} />}
                {vagas       && <SpecItem icon="🚗"  label="Vagas"      val={vagas} />}
                {frente      && <SpecItem icon="↔️"  label="Testada"    val={frente} />}
                {sol         && <SpecItem icon="☀️"  label="Posição"    val={sol} />}
                {ano         && <SpecItem icon="📅"  label="Ano"        val={ano} />}
              </div>
            )}

            {/* Description */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>📝 Descrição</h2>
              <p className={styles.desc}>{desc}</p>
            </div>

            {/* Amenidades */}
            {amenLabel.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>✅ Diferenciais</h2>
                <div className={styles.amenGrid}>
                  {amenLabel.map((label, i) => (
                    <div key={i} className={styles.amenItem}>{label}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Financial details */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>💰 Valores & Condições</h2>
              <div className={styles.financialGrid}>
                {valor_venda    && <FinItem label="Valor de Venda"   val={valor_venda}   highlight />}
                {valor_aluguel  && <FinItem label="Aluguel / mês"    val={valor_aluguel} highlight />}
                {iptu           && <FinItem label="IPTU / ano"       val={iptu} />}
                {condominio     && <FinItem label="Condomínio"       val={condominio} />}
                <FinItem label="Permuta"      val={permuta      ? '✅ Aceita' : '❌ Não aceita'} />
                <FinItem label="Financiamento" val={financiamento ? '✅ Aceita' : '❌ Não aceita'} />
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>🏠 Outros imóveis em {cidade}</h2>
                <div className={styles.relatedGrid}>
                  {related.map(im => (
                    <Link key={im.id} to={`/imovel/${makeSlug(im.titulo || im.tipo, im.id)}`} className={styles.relatedCard}>
                      <div className={styles.relatedThumb}>
                        {im.fotos?.[0]
                          ? <img src={im.fotos[0]} alt={im.titulo} />
                          : <span>{tipoEmoji(im.tipo)}</span>}
                      </div>
                      <div className={styles.relatedBody}>
                        <p className={styles.relatedTipo}>{im.tipo}</p>
                        <p className={styles.relatedTitulo}>{im.titulo || im.tipo}</p>
                        <p className={styles.relatedPreco}>{precoDisplay(im)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN (sticky CTA) ───────────────────────────── */}
          <aside className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaPrice}>
                <span className={styles.ctaPriceLabel}>
                  {finalidade === 'aluguel' ? 'Aluguel / mês' : 'Valor'}
                </span>
                <span className={styles.ctaPriceVal}>{preco}</span>
              </div>

              <div className={styles.ctaRef}>
                <span>Ref: {imovel.id}</span>
                <span className={statusClass(status)}>{status}</span>
              </div>

              <button className={`btn btn-gold ${styles.ctaBtn}`} onClick={openContact}>
                💬 Tenho Interesse
              </button>

              <a
                href={`https://wa.me/5548999999999?text=${encodeURIComponent(`Olá! Tenho interesse no imóvel "${titulo || tipo}" — ${bairro}, ${cidade}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${styles.ctaBtn}`}
              >
                📲 WhatsApp Direto
              </a>

              <button className={`btn btn-outline ${styles.ctaBtn}`} onClick={copyLink}>
                🔗 Copiar Link
              </button>

              <div className={styles.ctaAgent}>
                <div className={styles.ctaAgentAvatar}>FM</div>
                <div>
                  <p className={styles.ctaAgentName}>Felipe Mello</p>
                  <p className={styles.ctaAgentRole}>Corretor · CRECI-SC</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── LIGHTBOX ────────────────────────────────────────────── */}
      {lightbox && fotos.length > 0 && (
        <div className={styles.lightbox} onClick={() => setLightbox(false)}>
          <button className={styles.lightboxClose}>✕</button>
          <img
            src={fotos[photoIdx]}
            alt=""
            onClick={e => e.stopPropagation()}
          />
          {fotos.length > 1 && (
            <>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxLeft}`}
                onClick={e => { e.stopPropagation(); setPhotoIdx(i => (i - 1 + fotos.length) % fotos.length) }}
              >‹</button>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxRight}`}
                onClick={e => { e.stopPropagation(); setPhotoIdx(i => (i + 1) % fotos.length) }}
              >›</button>
            </>
          )}
          <p className={styles.lightboxCounter}>{photoIdx + 1} / {fotos.length}</p>
        </div>
      )}

      {/* ── CONTACT MODAL ───────────────────────────────────────── */}
      <Modal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title="💬 Manifestar Interesse"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setContactOpen(false)}>Cancelar</button>
            <button className="btn btn-gold" onClick={sendWhatsApp}>📲 Enviar via WhatsApp</button>
          </>
        }
      >
        <div className="fgroup">
          <label>Seu Nome</label>
          <input value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))} placeholder="Como posso te chamar?" />
        </div>
        <div className="fgroup">
          <label>Telefone</label>
          <input value={form.tel} onChange={e => setForm(p => ({ ...p, tel: e.target.value }))} placeholder="(48) 9 XXXX-XXXX" />
        </div>
        <div className="fgroup">
          <label>Mensagem</label>
          <textarea value={form.msg} rows={5} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))} />
        </div>
      </Modal>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div>
          <p>© {new Date().getFullYear()} Felipe Mello Imóveis · Garopaba & Imbituba — SC</p>
        </div>
      </footer>
    </div>
  )
}

// ── Small sub-components ───────────────────────────────────────────────────

function SpecItem({ icon, label, val }) {
  return (
    <div className={styles.specItem}>
      <span className={styles.specIcon}>{icon}</span>
      <div>
        <p className={styles.specLabel}>{label}</p>
        <p className={styles.specVal}>{val}</p>
      </div>
    </div>
  )
}

function FinItem({ label, val, highlight }) {
  return (
    <div className={styles.finItem}>
      <p className={styles.finLabel}>{label}</p>
      <p className={`${styles.finVal} ${highlight ? styles.finHighlight : ''}`}>{val}</p>
    </div>
  )
}
