import { Link } from 'react-router-dom'
import { tipoEmoji, precoDisplay, statusClass, makeSlug } from '../utils'
import styles from './PropertyCard.module.css'

export default function PropertyCard({ imovel, onContact }) {
  const { tipo, cidade, bairro, titulo, status, badge, permuta, finalidade } = imovel
  const emoji = tipoEmoji(tipo)
  const preco = precoDisplay(imovel)
  const slug  = makeSlug(titulo || tipo, imovel.id)

  return (
    <div className={styles.card}>
      {/* Thumbnail — clicking goes to listing page */}
      <Link to={`/imovel/${slug}`} className={styles.thumbLink}>
        <div className={styles.thumb}>
          {imovel.fotos?.length ? (
            <img src={imovel.fotos[0]} alt={titulo} />
          ) : (
            <span className={styles.thumbEmoji}>{emoji}</span>
          )}
          <div className={styles.thumbOverlay} />

          <div className={styles.badges}>
            {badge === 'Destaque' && <span className="badge-pill badge-destaque">Destaque</span>}
            {badge === 'Novo'     && <span className="badge-pill badge-venda">Novo</span>}
            {permuta             && <span className="badge-pill badge-permuta">Permuta</span>}
            <span className={`badge-pill ${finalidade === 'aluguel' ? 'badge-aluguel' : 'badge-venda'}`}>
              {finalidade === 'aluguel' ? 'Aluguel' : 'Venda'}
            </span>
          </div>

          <div className={styles.viewOverlay}>
            <span>Ver anúncio →</span>
          </div>
        </div>
      </Link>

      {/* Body */}
      <Link to={`/imovel/${slug}`} className={styles.bodyLink}>
        <div className={styles.body}>
          <p className={styles.tipo}>{tipo}</p>
          <h3 className={styles.titulo}>{titulo}</h3>
          <p className={styles.loc}>📍 {bairro}, {cidade} — SC</p>

          {/* Specs row */}
          <div className={styles.specs}>
            {imovel.area_total && <span>📐 {imovel.area_total}</span>}
            {imovel.quartos    && <span>🛏 {imovel.quartos} quartos</span>}
            {imovel.banheiros  && <span>🚿 {imovel.banheiros} banheiros</span>}
            {imovel.vagas      && <span>🚗 {imovel.vagas} vagas</span>}
          </div>
        </div>
      </Link>

      {/* Footer */}
      <div className={styles.footer}>
        <div>
          <p className={styles.preco}>{preco}</p>
          <span className={statusClass(status)}>{status}</span>
        </div>
        <div className={styles.footerActions}>
          <Link to={`/imovel/${slug}`} className="btn btn-outline btn-sm">
            Ver +
          </Link>
          <button
            className="btn btn-gold btn-sm"
            onClick={() => onContact?.(imovel)}
          >
            💬 Interesse
          </button>
        </div>
      </div>
    </div>
  )
}
