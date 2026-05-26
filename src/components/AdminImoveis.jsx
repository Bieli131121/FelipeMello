import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { tipoEmoji, statusClass, precoDisplay, makeSlug } from '../utils'
import { STATUS_IMOVEL } from '../data/constants'
import styles from './AdminImoveis.module.css'

export default function AdminImoveis({ imoveis, onEdit, onDelete, onNew, onChangeStatus }) {
  const [view, setView]       = useState('grid')
  const [search, setSearch]   = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filtered = useMemo(() => {
    return imoveis.filter(im => {
      const q = search.toLowerCase()
      const matchSearch = !q || im.titulo?.toLowerCase().includes(q) ||
        im.cidade?.toLowerCase().includes(q) || im.bairro?.toLowerCase().includes(q)
      const matchStatus = !filterStatus || im.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [imoveis, search, filterStatus])

  return (
    <div>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>Imóveis</h2>
          <p>{imoveis.length} cadastrado(s) — {imoveis.filter(i => i.status === 'Disponível').length} disponível(is)</p>
        </div>
        <button className="btn btn-gold" onClick={onNew}>➕ Novo Imóvel</button>
      </div>

      {/* Filters */}
      <div className={styles.filterRow}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Buscar por título, cidade, bairro..."
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Todos os status</option>
          {STATUS_IMOVEL.map(s => <option key={s}>{s}</option>)}
        </select>
        <div className={styles.viewToggle}>
          <button className={`${styles.viewBtn} ${view === 'grid'  ? styles.active : ''}`} onClick={() => setView('grid')}  title="Grade">⊞</button>
          <button className={`${styles.viewBtn} ${view === 'table' ? styles.active : ''}`} onClick={() => setView('table')} title="Lista">≡</button>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="empty-state">
          <span className="es-icon">🏠</span>
          <h3>Nenhum imóvel encontrado</h3>
          <p>Ajuste os filtros ou cadastre um novo imóvel.</p>
          <button className="btn btn-gold" onClick={onNew}>➕ Cadastrar Imóvel</button>
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map(im => (
            <AdminImCard
              key={im.id}
              im={im}
              onEdit={onEdit}
              onDelete={onDelete}
              onChangeStatus={onChangeStatus}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {view === 'table' && filtered.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.tbl}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Título / Local</th>
                <th>Preço</th>
                <th>Status</th>
                <th>Anúncio</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(im => {
                const slug = makeSlug(im.titulo || im.tipo, im.id)
                return (
                  <tr key={im.id}>
                    <td>
                      <div className={styles.tblThumb}>
                        {im.fotos?.[0]
                          ? <img src={im.fotos[0]} alt="" />
                          : <span>{tipoEmoji(im.tipo)}</span>}
                      </div>
                    </td>
                    <td>
                      <strong style={{ fontSize: '0.9rem', display: 'block' }}>{im.titulo || im.tipo}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>
                        📍 {im.bairro}, {im.cidade}
                      </span>
                    </td>
                    <td style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--ocean)' }}>
                      {precoDisplay(im)}
                    </td>
                    <td>
                      <select
                        className={styles.statusSelect}
                        value={im.status}
                        onChange={e => onChangeStatus(im.id, e.target.value)}
                      >
                        {STATUS_IMOVEL.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <Link to={`/imovel/${slug}`} target="_blank" className="btn btn-outline btn-xs">
                        🔗 Ver página
                      </Link>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button className="btn btn-outline btn-xs" onClick={() => onEdit(im)}>✏️ Editar</button>
                        <button className="btn btn-danger btn-xs"  onClick={() => onDelete(im.id)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function AdminImCard({ im, onEdit, onDelete, onChangeStatus }) {
  const slug = makeSlug(im.titulo || im.tipo, im.id)

  return (
    <div className={styles.imCard}>
      <div className={styles.imThumb}>
        {im.fotos?.[0]
          ? <img src={im.fotos[0]} alt={im.titulo} />
          : <span>{tipoEmoji(im.tipo)}</span>}
        <div className={styles.imThumbOverlay} />
        <div className={styles.imBadges}>
          {im.badge === 'Destaque' && <span className="badge-pill badge-destaque">Destaque</span>}
          {im.permuta && <span className="badge-pill badge-permuta">Permuta</span>}
        </div>
      </div>
      <div className={styles.imBody}>
        <p className={styles.imTipo}>{im.tipo}</p>
        <h3 className={styles.imTitle}>{im.titulo || im.tipo}</h3>
        <p className={styles.imLoc}>📍 {im.bairro}, {im.cidade}</p>
        <div className={styles.imFooter}>
          <div>
            <p className={styles.imPreco}>{precoDisplay(im)}</p>
            <span className={statusClass(im.status)}>{im.status}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link to={`/imovel/${slug}`} target="_blank" className="btn btn-outline btn-xs" title="Ver anúncio público">🔗</Link>
            <button className="btn btn-outline btn-xs" onClick={() => onEdit(im)}>✏️</button>
            <button className="btn btn-danger  btn-xs" onClick={() => onDelete(im.id)}>🗑</button>
          </div>
        </div>
      </div>
    </div>
  )
}
