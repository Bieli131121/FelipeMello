import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'imoveis',   icon: '🏠', label: 'Imóveis' },
  { id: 'leads',     icon: '👥', label: 'Leads' },
  { id: 'agenda',    icon: '📅', label: 'Agenda' },
  { id: 'novo',      icon: '➕', label: 'Novo Imóvel' },
]

export default function Sidebar({ active, onChange, counts = {} }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span style={{ fontSize: '1.8rem' }}>🏡</span>
        <div className={styles.logoText}>
          <strong>Felipe Mello</strong>
          <span>Painel ADM</span>
        </div>
      </div>

      <p className={styles.section}>Principal</p>

      {NAV_ITEMS.map(item => (
        <div
          key={item.id}
          className={`${styles.navItem} ${active === item.id ? styles.active : ''}`}
          onClick={() => onChange(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span>{item.label}</span>
          {counts[item.id] != null && (
            <span className={styles.badge}>{counts[item.id]}</span>
          )}
        </div>
      ))}

      <div className={styles.footer}>
        <Link to="/">← Voltar ao Site</Link>
      </div>
    </aside>
  )
}
