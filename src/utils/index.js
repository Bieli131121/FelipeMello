// ── Format currency ────────────────────────────────────────────────────────
export function formatBRL(value) {
  if (!value) return ''
  const digits = String(value).replace(/\D/g, '')
  if (!digits) return ''
  const num = parseInt(digits, 10) / 100
  return 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

// ── Today's ISO date string ────────────────────────────────────────────────
export function today() {
  return new Date().toISOString().split('T')[0]
}

// ── Map status to badge class ──────────────────────────────────────────────
export function statusClass(s) {
  const map = {
    'Disponível':    'badge-pill badge-disponivel',
    'Em Negociação': 'badge-pill badge-negociacao',
    'Vendido':       'badge-pill badge-vendido',
    'Locado':        'badge-pill badge-locado',
    'Suspenso':      'badge-pill badge-suspenso',
  }
  return map[s] || 'badge-pill badge-suspenso'
}

// ── Resolve price to display string ───────────────────────────────────────
export function precoDisplay(im) {
  if (!im) return 'Consulte'
  if (im.finalidade === 'aluguel') return im.valor_aluguel || 'Consulte'
  if (im.finalidade === 'venda_aluguel') return im.valor_venda || im.valor_aluguel || 'Consulte'
  return im.exib_valor !== false ? (im.valor_venda || 'Consulte') : 'Consulte'
}

// ── Emoji by property type ─────────────────────────────────────────────────
import { TIPO_EMOJI } from '../data/constants'
export function tipoEmoji(t) { return TIPO_EMOJI[t] || '🏠' }

// ── Finalidade label ───────────────────────────────────────────────────────
export function finalidadeLabel(f) {
  if (f === 'aluguel')      return 'Para Alugar'
  if (f === 'venda_aluguel') return 'Venda / Aluguel'
  return 'À Venda'
}

// ── Generate unique ID ─────────────────────────────────────────────────────
export function genId(prefix = 'ID') {
  return `${prefix}${Date.now()}`
}

// ── Generate URL-safe slug from title + id ─────────────────────────────────
// Example: "Terreno com vista para o mar" + "I001" → "terreno-com-vista-para-o-mar-i001"
export function makeSlug(titulo, id) {
  const base = (titulo || id)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // strip accents
    .replace(/[^a-z0-9\s-]/g, '')      // keep letters, digits, spaces, hyphens
    .trim()
    .replace(/\s+/g, '-')              // spaces → hyphens
    .replace(/-+/g, '-')               // collapse multiple hyphens
    .slice(0, 60)                      // max 60 chars for readability
  // Append the raw ID so slugs are always unique even for duplicate titles
  return `${base}-${id.toLowerCase()}`
}

// ── Find an imóvel by slug ──────────────────────────────────────────────────
export function findBySlug(imoveis, slug) {
  return imoveis.find(im => makeSlug(im.titulo || im.tipo, im.id) === slug)
}
