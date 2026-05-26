import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TIPOS_IMOVEL, CIDADES, FINALIDADES, STATUS_IMOVEL, AMENIDADES } from '../data/constants'
import { genId, formatBRL, today, makeSlug } from '../utils'
import styles from './ImovelForm.module.css'

const EMPTY = {
  tipo: 'Terreno / Lote', finalidade: 'venda',
  cidade: 'Garopaba', bairro: '', titulo: '', desc: '',
  area_total: '', area_const: '', frente: '',
  quartos: '', suites: '', banheiros: '', vagas: '', ano: '', sol: '',
  valor_venda: '', valor_aluguel: '', iptu: '', condominio: '',
  permuta: false, financiamento: false, exib_valor: true,
  status: 'Disponível', badge: '', amenidades: [], obs_int: '', fotos: [],
}

const STEPS = ['📍 Localização', '📐 Características', '💰 Financeiro', '📸 Fotos & Publicar']

export default function ImovelForm({ initial, onSave, onCancel, toast }) {
  const [step, setStep]     = useState(0)
  const [form, setForm]     = useState({ ...EMPTY, ...initial })
  const [photos, setPhotos] = useState(initial?.fotos || [])

  useEffect(() => {
    setForm({ ...EMPTY, ...initial })
    setPhotos(initial?.fotos || [])
    setStep(0)
  }, [initial])

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const toggleAmen = (id) => setForm(prev => ({
    ...prev,
    amenidades: prev.amenidades.includes(id)
      ? prev.amenidades.filter(a => a !== id)
      : [...prev.amenidades, id],
  }))

  const handlePhotoUpload = (files) => {
    Array.from(files).slice(0, 20 - photos.length).forEach(file => {
      if (!file.type.startsWith('image/')) { toast('Apenas imagens permitidas'); return }
      if (file.size > 5 * 1024 * 1024) { toast(`${file.name} maior que 5MB`); return }
      const reader = new FileReader()
      reader.onload = e => setPhotos(prev => [...prev, e.target.result])
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (i) => setPhotos(prev => prev.filter((_, idx) => idx !== i))

  const handleSave = () => {
    if (!form.tipo || !form.cidade || !form.bairro) { toast('⚠️ Preencha tipo, cidade e bairro'); setStep(0); return }
    const data = { ...form, fotos: photos, id: form.id || genId('I') }
    onSave(data)
  }

  const isEdit = !!initial?.id

  return (
    <div className={styles.wrap}>
      {/* Steps */}
      <div className={styles.steps}>
        {STEPS.map((s, i) => (
          <div key={i} className={`${styles.step} ${i === step ? styles.stepActive : ''} ${i < step ? styles.stepDone : ''}`}>
            <div className={styles.stepNum}>{i < step ? '✓' : i + 1}</div>
            <span className={styles.stepLabel}>{s}</span>
          </div>
        ))}
      </div>

      {/* Pages */}
      <div className={styles.body}>

        {/* PAGE 1: Localização */}
        {step === 0 && (
          <div>
            <p className={styles.fsec}>🏠 Tipo & Finalidade</p>
            <div className="frow">
              <div className="fgroup">
                <label>Tipo <span className="req">*</span></label>
                <select value={form.tipo} onChange={e => set('tipo', e.target.value)}>
                  {TIPOS_IMOVEL.map(g => (
                    <optgroup key={g.group} label={g.group}>
                      {g.options.map(o => <option key={o}>{o}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="fgroup">
                <label>Finalidade</label>
                <select value={form.finalidade} onChange={e => set('finalidade', e.target.value)}>
                  {FINALIDADES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>
            </div>
            <p className={styles.fsec}>📍 Localização</p>
            <div className="frow">
              <div className="fgroup">
                <label>Cidade <span className="req">*</span></label>
                <select value={form.cidade} onChange={e => set('cidade', e.target.value)}>
                  {CIDADES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="fgroup">
                <label>Bairro <span className="req">*</span></label>
                <input value={form.bairro} onChange={e => set('bairro', e.target.value)} placeholder="Ex: Ferrugem, Praia do Rosa..." />
              </div>
            </div>
            <div className="fgroup">
              <label>Título do Anúncio <span className="req">*</span></label>
              <input value={form.titulo} maxLength={80} onChange={e => set('titulo', e.target.value)} placeholder="Ex: Terreno com vista para o mar na Ferrugem" />
              <div className="char-counter">{form.titulo.length}/80</div>
            </div>
            <div className="fgroup">
              <label>Descrição <span className="req">*</span></label>
              <textarea value={form.desc} maxLength={1500} rows={5} onChange={e => set('desc', e.target.value)} placeholder="Descreva os diferenciais do imóvel..." />
              <div className="char-counter">{form.desc.length}/1500</div>
            </div>
          </div>
        )}

        {/* PAGE 2: Características */}
        {step === 1 && (
          <div>
            <p className={styles.fsec}>📐 Áreas</p>
            <div className="frow3">
              <div className="fgroup"><label>Área Total</label><input value={form.area_total} onChange={e => set('area_total', e.target.value)} placeholder="Ex: 500 m²" /></div>
              <div className="fgroup"><label>Área Construída</label><input value={form.area_const} onChange={e => set('area_const', e.target.value)} placeholder="Ex: 320 m²" /></div>
              <div className="fgroup"><label>Frente (testada)</label><input value={form.frente} onChange={e => set('frente', e.target.value)} placeholder="Ex: 15 m" /></div>
            </div>
            <p className={styles.fsec}>🏗 Características</p>
            <div className="frow4">
              {[['quartos','Quartos'],['suites','Suítes'],['banheiros','Banheiros'],['vagas','Vagas']].map(([k, label]) => (
                <div key={k} className="fgroup">
                  <label>{label}</label>
                  <select value={form[k]} onChange={e => set(k, e.target.value)}>
                    <option value="">—</option>
                    {['0','1','2','3','4','5','6+'].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <p className={styles.fsec}>✅ Diferenciais</p>
            <div className={styles.amenGrid}>
              {AMENIDADES.map(a => (
                <label key={a.id} className={`${styles.amenItem} ${form.amenidades.includes(a.id) ? styles.amenActive : ''}`}>
                  <input type="checkbox" checked={form.amenidades.includes(a.id)} onChange={() => toggleAmen(a.id)} style={{ display: 'none' }} />
                  {a.label}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 3: Financeiro */}
        {step === 2 && (
          <div>
            <p className={styles.fsec}>💰 Valores</p>
            {(form.finalidade === 'venda' || form.finalidade === 'venda_aluguel') && (
              <div className="frow">
                <div className="fgroup"><label>Valor de Venda</label><input value={form.valor_venda} onChange={e => set('valor_venda', e.target.value)} placeholder="R$ 0,00" /></div>
                <div className="fgroup"><label>IPTU / Ano</label><input value={form.iptu} onChange={e => set('iptu', e.target.value)} placeholder="R$ 0,00" /></div>
              </div>
            )}
            {(form.finalidade === 'aluguel' || form.finalidade === 'venda_aluguel') && (
              <div className="frow">
                <div className="fgroup"><label>Aluguel / Mês</label><input value={form.valor_aluguel} onChange={e => set('valor_aluguel', e.target.value)} placeholder="R$ 0,00" /></div>
                <div className="fgroup"><label>Condomínio</label><input value={form.condominio} onChange={e => set('condominio', e.target.value)} placeholder="R$ 0,00" /></div>
              </div>
            )}
            <div className={styles.toggleRow}>
              <div><p>Aceita permuta</p></div>
              <label className="toggle-sw">
                <input type="checkbox" checked={form.permuta} onChange={e => set('permuta', e.target.checked)} />
                <span className="toggle-track" />
              </label>
            </div>
            <div className={styles.toggleRow}>
              <div><p>Aceita financiamento</p></div>
              <label className="toggle-sw">
                <input type="checkbox" checked={form.financiamento} onChange={e => set('financiamento', e.target.checked)} />
                <span className="toggle-track" />
              </label>
            </div>
            <p className={styles.fsec} style={{ marginTop: '1.5rem' }}>⚙️ Configurações</p>
            <div className="frow">
              <div className="fgroup">
                <label>Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)}>
                  {STATUS_IMOVEL.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="fgroup">
                <label>Badge</label>
                <select value={form.badge} onChange={e => set('badge', e.target.value)}>
                  {['', 'Destaque', 'Novo', 'Exclusivo'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div className="fgroup">
              <label>Observações Internas</label>
              <textarea value={form.obs_int || ''} onChange={e => set('obs_int', e.target.value)} rows={3} placeholder="Notas internas, não publicadas..." />
            </div>
          </div>
        )}

        {/* PAGE 4: Fotos */}
        {step === 3 && (
          <div>
            <p className={styles.fsec}>📸 Fotos</p>
            <div
              className={styles.uploadArea}
              onClick={() => document.getElementById('photo-input').click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handlePhotoUpload(e.dataTransfer.files) }}
            >
              <input id="photo-input" type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handlePhotoUpload(e.target.files)} />
              <p className={styles.uploadIcon}>📷</p>
              <p className={styles.uploadText}><strong>Clique ou arraste</strong> imagens aqui</p>
              <p className={styles.uploadHint}>Máx 20 fotos · JPG, PNG · até 5MB cada</p>
            </div>
            {photos.length > 0 && (
              <div className={styles.photoGrid}>
                {photos.map((src, i) => (
                  <div key={i} className={styles.photoThumb}>
                    <img src={src} alt="" />
                    {i === 0 && <span className={styles.photoCapa}>CAPA</span>}
                    <button className={styles.photoDel} onClick={() => removePhoto(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}
            <div className="highlight-box" style={{ marginTop: '1.5rem' }}>
              ℹ️ Revise todos os dados antes de salvar. O imóvel ficará imediatamente visível no site.
            </div>
            {/* Slug preview — visible when title is already set */}
            {form.titulo && (
              <div className={styles.slugPreview}>
                <span className={styles.slugLabel}>🔗 URL do anúncio (após salvar):</span>
                <code className={styles.slugCode}>
                  /imovel/{makeSlug(form.titulo, form.id || '(novo)')}
                </code>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      <div className={styles.nav}>
        <button className="btn btn-outline" onClick={step === 0 ? onCancel : () => setStep(s => s - 1)}>
          {step === 0 ? '✕ Cancelar' : '← Anterior'}
        </button>
        {step < STEPS.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>Próximo →</button>
        ) : (
          <button className="btn btn-gold" onClick={handleSave}>
            💾 {isEdit ? 'Salvar Alterações' : 'Publicar Imóvel'}
          </button>
        )}
      </div>
    </div>
  )
}
