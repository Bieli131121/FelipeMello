import { useState, useMemo } from 'react'
import PropertyCard from './PropertyCard'
import styles from './ListingSection.module.css'

const FILTERS = ['Todos', 'Terreno / Lote', 'Casa', 'Área / Gleba', 'Fazenda', 'Apartamento']

export default function ListingSection({ imoveis, onContact }) {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered = useMemo(() => {
    if (activeFilter === 'Todos') return imoveis
    return imoveis.filter(im => im.tipo === activeFilter)
  }, [imoveis, activeFilter])

  const disponiveis = imoveis.filter(im => im.status === 'Disponível').length

  return (
    <section id="imoveis" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag">Portfólio</span>
          <h2>Imóveis <em>disponíveis</em></h2>
          <p className={styles.sub}>
            {disponiveis} imóvel(is) disponível(is) em Garopaba, Imbituba e região.
          </p>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="es-icon">🏠</span>
            <h3>Nenhum imóvel encontrado</h3>
            <p>Tente outro filtro ou entre em contato para busca personalizada.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(im => (
              <PropertyCard key={im.id} imovel={im} onContact={onContact} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
