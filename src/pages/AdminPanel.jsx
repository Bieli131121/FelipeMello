import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import AdminImoveis from '../components/AdminImoveis'
import AdminLeads from '../components/AdminLeads'
import AdminAgenda from '../components/AdminAgenda'
import ImovelForm from '../components/ImovelForm'
import { genId, today } from '../utils'
import styles from './AdminPanel.module.css'

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard',    sub: 'Visão geral do negócio' },
  imoveis:   { title: 'Imóveis',      sub: 'Gestão do portfólio' },
  leads:     { title: 'Leads / CRM',  sub: 'Pipeline de clientes' },
  agenda:    { title: 'Agenda',       sub: 'Visitas agendadas' },
  novo:      { title: 'Novo Imóvel',  sub: 'Cadastrar ou editar imóvel' },
}

export default function AdminPanel({ imoveis, leads, visitas, onImoveisChange, onLeadsChange, onVisitasChange, toast, onClose }) {
  const [panel, setPanel]               = useState('dashboard')
  const [editingImovel, setEditingImovel] = useState(null)

  const handleNewImovel  = () => { setEditingImovel(null); setPanel('novo') }
  const handleEditImovel = (im) => { setEditingImovel(im); setPanel('novo') }

  const handleDeleteImovel = (id) => {
    if (!confirm('Remover este imóvel do sistema?')) return
    onImoveisChange(prev => prev.filter(i => i.id !== id))
    toast('🗑 Imóvel removido', 'info')
  }

  const handleChangeStatus = (id, status) => {
    onImoveisChange(prev => prev.map(i => i.id === id ? { ...i, status } : i))
    toast('✅ Status atualizado', 'success')
  }

  const handleSaveImovel = (data) => {
    if (editingImovel) {
      onImoveisChange(prev => prev.map(i => i.id === data.id ? data : i))
      toast('✅ Imóvel atualizado!', 'success')
    } else {
      onImoveisChange(prev => [{ ...data, id: genId('I') }, ...prev])
      toast('✅ Imóvel cadastrado!', 'success')
    }
    setPanel('imoveis')
    setEditingImovel(null)
  }

  const counts = {
    leads:  leads.filter(l => l.status === 'novo').length || undefined,
    agenda: visitas.filter(v => v.data >= today()).length || undefined,
  }

  const { title, sub } = PAGE_TITLES[panel] || PAGE_TITLES.dashboard

  return (
    <div className={styles.layout}>
      <Sidebar active={panel} onChange={setPanel} counts={counts} />

      <div className={styles.main}>
        {/* Topbar */}
        <div className={styles.topbar}>
          <div>
            <h1 className={styles.topTitle}>{title}</h1>
            <p className={styles.topSub}>{sub}</p>
          </div>
          <div className={styles.topRight}>
            <Link to="/" className="btn btn-outline btn-sm">← Site Público</Link>
            <div className={styles.avatar}>FM</div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {panel === 'dashboard' && (
            <Dashboard imoveis={imoveis} leads={leads} visitas={visitas} />
          )}
          {panel === 'imoveis' && (
            <AdminImoveis
              imoveis={imoveis}
              onNew={handleNewImovel}
              onEdit={handleEditImovel}
              onDelete={handleDeleteImovel}
              onChangeStatus={handleChangeStatus}
            />
          )}
          {panel === 'leads' && (
            <AdminLeads leads={leads} onChange={onLeadsChange} toast={toast} />
          )}
          {panel === 'agenda' && (
            <AdminAgenda visitas={visitas} onChange={onVisitasChange} toast={toast} />
          )}
          {panel === 'novo' && (
            <ImovelForm
              initial={editingImovel}
              onSave={handleSaveImovel}
              onCancel={() => setPanel('imoveis')}
              toast={toast}
            />
          )}
        </div>
      </div>
    </div>
  )
}
