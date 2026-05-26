import { useState } from 'react'
import styles from './Hero.module.css'

const TIPOS = ['', 'Terreno / Lote', 'Casa', 'Área / Gleba', 'Fazenda', 'Apartamento', 'Sítio']
const CIDADES = ['', 'Garopaba', 'Imbituba', 'Paulo Lopes', 'Florianópolis']
const PRECOS = ['', 'Até R$ 500 mil', 'Até R$ 1 milhão', 'Até R$ 3 milhões', 'Acima de R$ 3 milhões']
const TABS = ['Comprar', 'Alugar', 'Permutar']
const STATS = [
  { num: '18+', lab: 'Anos de Experiência' },
  { num: '500+', lab: 'Imóveis Negociados' },
  { num: '100%', lab: 'Satisfação Garantida' },
]

export default function Hero({ onSearch }) {
  const [tab, setTab] = useState('Comprar')
  const [tipo, setTipo] = useState('')
  const [cidade, setCidade] = useState('')
  const [preco, setPreco] = useState('')

  const handleSearch = () => {
    onSearch?.({ tab, tipo, cidade, preco })
    document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.pattern} />

      <span className={styles.label}>🌊 Garopaba &amp; Imbituba — Santa Catarina</span>

      <h1 className={styles.title}>
        Encontre o imóvel <em>perfeito</em> em Santa Catarina
      </h1>

      <p className={styles.sub}>
        Terrenos, casas, áreas e fazendas nas praias mais bonitas do sul do Brasil.
        18 anos de experiência e curadoria especializada.
      </p>

      {/* Search Box */}
      <div className={styles.searchBox}>
        <div className={styles.searchTabs}>
          {TABS.map(t => (
            <button
              key={t}
              className={`${styles.stab} ${tab === t ? styles.stabActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={styles.searchRow}>
          <div className={styles.field}>
            <label>Tipo de Imóvel</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="">Todos os tipos</option>
              {TIPOS.slice(1).map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label>Cidade</label>
            <select value={cidade} onChange={e => setCidade(e.target.value)}>
              <option value="">Todas as cidades</option>
              {CIDADES.slice(1).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label>Orçamento máx.</label>
            <select value={preco} onChange={e => setPreco(e.target.value)}>
              <option value="">Qualquer valor</option>
              {PRECOS.slice(1).map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <button className={styles.btnSearch} onClick={handleSearch}>
            🔍 Buscar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {STATS.map(s => (
          <div key={s.lab} className={styles.stat}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLab}>{s.lab}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
