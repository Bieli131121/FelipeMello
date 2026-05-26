import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar({ onAdmClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const scrollTo = (id) => {
    // If already on home page, scroll; otherwise navigate home then scroll
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
    setMenuOpen(false)
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>🏡</span>
        <div>
          <span>Felipe Mello <span className={styles.gold}>Imóveis</span></span>
          <span className={styles.logoBadge}>Garopaba & Imbituba — SC</span>
        </div>
      </Link>

      <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <a onClick={() => scrollTo('imoveis')}>Imóveis</a>
        <a onClick={() => scrollTo('sobre')}>Sobre</a>
        <a onClick={() => scrollTo('contato')}>Contato</a>
        <a
          href="https://wa.me/5548999999999"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          💬 WhatsApp
        </a>
        <button className={styles.crmBtn} onClick={onAdmClick}>
          ⚙️ Painel ADM
        </button>
      </div>

      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>
    </nav>
  )
}
