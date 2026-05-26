import { useState } from 'react'
import { today, genId } from '../utils'
import Modal from './Modal'
import styles from './AdminAgenda.module.css'

const EMPTY_VISITA = { cliente: '', imovel: '', data: today(), hora: '10:00', obs: '', status: 'Confirmada' }

export default function AdminAgenda({ visitas, onChange, toast }) {
  const [modal, setModal]   = useState(false)
  const [form, setForm]     = useState(EMPTY_VISITA)

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSave = () => {
    if (!form.cliente || !form.data) { toast('⚠️ Preencha cliente e data'); return }
    onChange(prev => [...prev, { id: genId('V'), ...form }])
    toast('📅 Visita agendada!', 'success')
    setModal(false)
    setForm(EMPTY_VISITA)
  }

  const handleDelete = (id) => {
    onChange(prev => prev.filter(v => v.id !== id))
    toast('Visita removida')
  }

  // Sort by date
  const sorted = [...visitas].sort((a, b) => a.data.localeCompare(b.data))
  const upcoming = sorted.filter(v => v.data >= today())
  const past     = sorted.filter(v => v.data < today())

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h2>Agenda de Visitas</h2>
          <p>{upcoming.length} visita(s) agendada(s)</p>
        </div>
        <button className="btn btn-gold" onClick={() => setModal(true)}>📅 Agendar Visita</button>
      </div>

      {visitas.length === 0 && (
        <div className="empty-state">
          <span className="es-icon">📅</span>
          <h3>Nenhuma visita agendada</h3>
          <p>Agende visitas para seus clientes.</p>
          <button className="btn btn-gold" onClick={() => setModal(true)}>📅 Agendar</button>
        </div>
      )}

      {upcoming.length > 0 && (
        <>
          <h3 className={styles.sectionTitle}>🗓 Próximas</h3>
          <div className={styles.visitasList}>
            {upcoming.map(v => <VisitaCard key={v.id} visita={v} onDelete={handleDelete} />)}
          </div>
        </>
      )}

      {past.length > 0 && (
        <>
          <h3 className={styles.sectionTitle} style={{ marginTop: '2rem', opacity: 0.6 }}>📁 Realizadas</h3>
          <div className={styles.visitasList}>
            {past.map(v => <VisitaCard key={v.id} visita={v} onDelete={handleDelete} past />)}
          </div>
        </>
      )}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Agendar Visita"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setModal(false)}>Cancelar</button>
            <button className="btn btn-gold" onClick={handleSave}>💾 Salvar</button>
          </>
        }
      >
        <div className="fgroup"><label>Cliente <span className="req">*</span></label><input value={form.cliente} onChange={e => set('cliente', e.target.value)} /></div>
        <div className="fgroup"><label>Imóvel</label><input value={form.imovel} onChange={e => set('imovel', e.target.value)} /></div>
        <div className="frow">
          <div className="fgroup"><label>Data <span className="req">*</span></label><input type="date" value={form.data} onChange={e => set('data', e.target.value)} /></div>
          <div className="fgroup"><label>Hora</label><input type="time" value={form.hora} onChange={e => set('hora', e.target.value)} /></div>
        </div>
        <div className="fgroup"><label>Observações</label><textarea value={form.obs} onChange={e => set('obs', e.target.value)} rows={2} /></div>
      </Modal>
    </div>
  )
}

function VisitaCard({ visita: v, onDelete, past }) {
  return (
    <div className={`${styles.card} ${past ? styles.cardPast : ''}`}>
      <div className={styles.cardDate}>
        <span className={styles.cardDay}>{v.data.split('-')[2]}</span>
        <span className={styles.cardMonth}>{new Date(v.data + 'T12:00:00').toLocaleString('pt-BR', { month: 'short' })}</span>
      </div>
      <div className={styles.cardBody}>
        <strong>{v.cliente}</strong>
        {v.imovel && <p className={styles.cardImovel}>🏠 {v.imovel}</p>}
        <p className={styles.cardHora}>⏰ {v.hora} · {v.status}</p>
        {v.obs && <p className={styles.cardObs}>{v.obs}</p>}
      </div>
      <button className="btn btn-danger btn-xs" style={{ alignSelf: 'flex-start' }} onClick={() => onDelete(v.id)}>🗑</button>
    </div>
  )
}
