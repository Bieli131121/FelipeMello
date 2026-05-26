import { useState, useMemo } from 'react'
import { STATUS_LEAD, ORIGENS_LEAD } from '../data/constants'
import { today, genId } from '../utils'
import Modal from './Modal'
import styles from './AdminLeads.module.css'

const EMPTY_LEAD = { nome: '', tel: '', email: '', origem: 'Instagram', status: 'novo', interesse: '', orcamento: '', obs: '' }

export default function AdminLeads({ leads, onChange, toast }) {
  const [search, setSearch]       = useState('')
  const [filterStatus, setFilter] = useState('')
  const [modal, setModal]         = useState(null)   // null | { mode: 'form'|'detail', data }
  const [form, setForm]           = useState(EMPTY_LEAD)
  const [editId, setEditId]       = useState(null)

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const q = search.toLowerCase()
      const matchSearch = !q || l.nome?.toLowerCase().includes(q) || l.tel?.includes(q) || l.interesse?.toLowerCase().includes(q)
      const matchStatus = !filterStatus || l.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [leads, search, filterStatus])

  const openNew = () => {
    setForm(EMPTY_LEAD)
    setEditId(null)
    setModal({ mode: 'form' })
  }

  const openEdit = (l) => {
    setForm({ nome: l.nome, tel: l.tel, email: l.email || '', origem: l.origem, status: l.status, interesse: l.interesse, orcamento: l.orcamento || '', obs: l.obs || '' })
    setEditId(l.id)
    setModal({ mode: 'form' })
  }

  const openDetail = (l) => setModal({ mode: 'detail', data: l })

  const closeModal = () => setModal(null)

  const handleSave = () => {
    if (!form.nome || !form.tel) { toast('⚠️ Preencha nome e telefone'); return }
    if (editId) {
      onChange(prev => prev.map(l => l.id === editId
        ? { ...l, ...form, historico: [...(l.historico || []), `${today()} — Status: ${form.status}`] }
        : l
      ))
      toast('✅ Lead atualizado!', 'success')
    } else {
      const newLead = { id: genId('L'), ...form, data: today(), historico: [`${today()} — Lead criado manualmente`] }
      onChange(prev => [newLead, ...prev])
      toast('✅ Lead adicionado!', 'success')
    }
    closeModal()
  }

  const handleDelete = (id) => {
    if (!confirm('Remover este lead?')) return
    onChange(prev => prev.filter(l => l.id !== id))
    toast('Lead removido')
  }

  const addNota = (id, nota) => {
    if (!nota.trim()) return
    onChange(prev => prev.map(l => l.id === id
      ? { ...l, historico: [...(l.historico || []), `${today()} — ${nota}`] }
      : l
    ))
    toast('Nota adicionada', 'success')
  }

  return (
    <div>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>Leads / CRM</h2>
          <p>{leads.length} lead(s) — {leads.filter(l => l.status === 'novo').length} novo(s)</p>
        </div>
        <button className="btn btn-gold" onClick={openNew}>➕ Novo Lead</button>
      </div>

      {/* Filters */}
      <div className={styles.filterRow}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar lead..." />
        <select value={filterStatus} onChange={e => setFilter(e.target.value)}>
          <option value="">Todos os status</option>
          {STATUS_LEAD.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="es-icon">👥</span>
          <h3>Nenhum lead encontrado</h3>
          <p>Adicione seu primeiro lead ou ajuste os filtros.</p>
          <button className="btn btn-gold" onClick={openNew}>➕ Adicionar Lead</button>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.tbl}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contato</th>
                <th>Interesse</th>
                <th>Orçamento</th>
                <th>Origem</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => {
                const s = STATUS_LEAD.find(x => x.value === l.status)
                return (
                  <tr key={l.id}>
                    <td>
                      <strong style={{ display: 'block' }}>{l.nome}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-soft)' }}>{l.data}</span>
                    </td>
                    <td>
                      <div>{l.tel}</div>
                      {l.email && <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>{l.email}</div>}
                    </td>
                    <td>{l.interesse}</td>
                    <td>{l.orcamento || '—'}</td>
                    <td><span className={styles.origemBadge}>{l.origem}</span></td>
                    <td><span style={{ fontSize: '0.78rem', color: s?.color, fontWeight: 600 }}>{s?.label || l.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button className="btn btn-outline btn-xs" onClick={() => openDetail(l)}>👁</button>
                        <button className="btn btn-outline btn-xs" onClick={() => openEdit(l)}>✏️</button>
                        <a href={`https://wa.me/55${l.tel.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-xs">💬</a>
                        <button className="btn btn-danger btn-xs" onClick={() => handleDelete(l.id)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {modal?.mode === 'form' && (
        <Modal
          open
          onClose={closeModal}
          title={editId ? 'Editar Lead' : 'Novo Lead'}
          footer={
            <>
              <button className="btn btn-outline" onClick={closeModal}>Cancelar</button>
              <button className="btn btn-gold" onClick={handleSave}>💾 Salvar</button>
            </>
          }
        >
          <LeadForm form={form} onChange={setForm} />
        </Modal>
      )}

      {/* Detail Modal */}
      {modal?.mode === 'detail' && modal.data && (
        <LeadDetailModal
          lead={modal.data}
          onClose={closeModal}
          onEdit={() => { openEdit(modal.data); }}
          onAddNota={addNota}
        />
      )}
    </div>
  )
}

function LeadForm({ form, onChange }) {
  const set = (k, v) => onChange(prev => ({ ...prev, [k]: v }))
  return (
    <div>
      <div className="frow">
        <div className="fgroup"><label>Nome <span className="req">*</span></label><input value={form.nome} onChange={e => set('nome', e.target.value)} /></div>
        <div className="fgroup"><label>Telefone <span className="req">*</span></label><input value={form.tel} onChange={e => set('tel', e.target.value)} placeholder="48 9XXXX-XXXX" /></div>
      </div>
      <div className="frow">
        <div className="fgroup"><label>E-mail</label><input value={form.email} onChange={e => set('email', e.target.value)} /></div>
        <div className="fgroup">
          <label>Origem</label>
          <select value={form.origem} onChange={e => set('origem', e.target.value)}>
            {ORIGENS_LEAD.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div className="frow">
        <div className="fgroup"><label>Interesse</label><input value={form.interesse} onChange={e => set('interesse', e.target.value)} placeholder="Ex: Terreno Garopaba" /></div>
        <div className="fgroup"><label>Orçamento</label><input value={form.orcamento} onChange={e => set('orcamento', e.target.value)} placeholder="Ex: R$ 800.000" /></div>
      </div>
      <div className="fgroup">
        <label>Status</label>
        <select value={form.status} onChange={e => set('status', e.target.value)}>
          {STATUS_LEAD.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      <div className="fgroup"><label>Observações</label><textarea value={form.obs} onChange={e => set('obs', e.target.value)} rows={3} /></div>
    </div>
  )
}

function LeadDetailModal({ lead: l, onClose, onEdit, onAddNota }) {
  const [nota, setNota] = useState('')
  const handleAddNota = () => { onAddNota(l.id, nota); setNota('') }
  const s = STATUS_LEAD.find(x => x.value === l.status)

  return (
    <Modal
      open
      onClose={onClose}
      title={`Lead: ${l.nome}`}
      size="modal-lg"
      footer={
        <>
          <button className="btn btn-outline" onClick={onClose}>Fechar</button>
          <button className="btn btn-primary" onClick={onEdit}>✏️ Editar</button>
          <a href={`https://wa.me/55${l.tel.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold">💬 WhatsApp</a>
        </>
      }
    >
      <div className="frow" style={{ marginBottom: '1rem' }}>
        {[['Nome', l.nome], ['Telefone', l.tel], ['E-mail', l.email || '—'], ['Origem', l.origem], ['Interesse', l.interesse], ['Orçamento', l.orcamento || '—']].map(([label, val]) => (
          <div key={label} style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-soft)', fontWeight: 700, display: 'block' }}>{label}</span>
            <p style={{ marginTop: 4, fontWeight: 600 }}>{val}</p>
          </div>
        ))}
      </div>
      {l.obs && (
        <div style={{ background: 'var(--sand)', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem' }}>{l.obs}</p>
        </div>
      )}
      <h4 style={{ fontFamily: "'Playfair Display',serif", color: 'var(--ocean)', marginBottom: '0.75rem' }}>Histórico</h4>
      <div style={{ marginBottom: '1rem' }}>
        {(l.historico || []).map((h, i) => (
          <div key={i} style={{ borderLeft: '2px solid var(--border)', paddingLeft: '0.75rem', marginBottom: '0.5rem', fontSize: '0.82rem', color: 'var(--text-soft)' }}>{h}</div>
        ))}
      </div>
      <div>
        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, color: 'var(--ocean)', display: 'block', marginBottom: '0.5rem' }}>Adicionar nota</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={nota}
            onChange={e => setNota(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddNota()}
            placeholder="Ex: Cliente ligou pedindo proposta..."
            style={{ flex: 1, padding: '0.6rem 0.9rem', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: '0.875rem', fontFamily: "'DM Sans',sans-serif", outline: 'none' }}
          />
          <button className="btn btn-primary btn-sm" onClick={handleAddNota}>+ Nota</button>
        </div>
      </div>
    </Modal>
  )
}
