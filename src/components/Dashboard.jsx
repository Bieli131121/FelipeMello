import styles from './Dashboard.module.css'
import { STATUS_LEAD } from '../data/constants'

export default function Dashboard({ imoveis, leads, visitas }) {
  const disponíveis  = imoveis.filter(i => i.status === 'Disponível').length
  const vendidos     = imoveis.filter(i => i.status === 'Vendido').length
  const novosLeads   = leads.filter(l => l.status === 'novo').length
  const visitasHoje  = visitas.filter(v => v.data === new Date().toISOString().split('T')[0]).length

  const kpis = [
    { label: 'Imóveis Ativos',     val: disponíveis,  icon: '🏠', sub: `${imoveis.length} no total` },
    { label: 'Leads',              val: leads.length, icon: '👥', sub: `${novosLeads} novos` },
    { label: 'Visitas Hoje',       val: visitasHoje,  icon: '📅', sub: `${visitas.length} total` },
    { label: 'Imóveis Vendidos',   val: vendidos,     icon: '✅', sub: 'este portfólio' },
  ]

  // Recent leads
  const recentLeads = [...leads].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5)

  // Leads by status
  const leadsByStatus = STATUS_LEAD.map(s => ({
    ...s,
    count: leads.filter(l => l.status === s.value).length,
  }))

  return (
    <div>
      {/* KPIs */}
      <div className={styles.kpiGrid}>
        {kpis.map(k => (
          <div key={k.label} className={styles.kpiCard}>
            <p className={styles.kpiLabel}>{k.label}</p>
            <p className={styles.kpiVal}>{k.val}</p>
            <p className={styles.kpiSub}>{k.sub}</p>
            <span className={styles.kpiIcon}>{k.icon}</span>
          </div>
        ))}
      </div>

      <div className={styles.cols}>
        {/* Recent Leads */}
        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Leads Recentes</h3>
          {recentLeads.length === 0 ? (
            <p style={{ color: 'var(--text-soft)', fontSize: '0.875rem' }}>Nenhum lead ainda.</p>
          ) : (
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Interesse</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map(l => {
                  const s = STATUS_LEAD.find(x => x.value === l.status)
                  return (
                    <tr key={l.id}>
                      <td><strong>{l.nome}</strong></td>
                      <td>{l.interesse}</td>
                      <td><span style={{ fontSize: '0.78rem', color: s?.color }}>{s?.label || l.status}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Leads by status */}
        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Pipeline de Leads</h3>
          <div className={styles.pipeline}>
            {leadsByStatus.map(s => (
              <div key={s.value} className={styles.pipeItem}>
                <span>{s.label}</span>
                <div className={styles.pipeBar}>
                  <div
                    className={styles.pipeBarFill}
                    style={{
                      width: leads.length ? `${(s.count / leads.length) * 100}%` : '0%',
                      background: s.color,
                    }}
                  />
                </div>
                <span className={styles.pipeCount}>{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
