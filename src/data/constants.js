// ── TIPOS DE IMÓVEL ──────────────────────
export const TIPOS_IMOVEL = [
  { group: 'Residencial',  options: ['Casa', 'Apartamento', 'Cobertura', 'Sobrado', 'Kitnet / Studio', 'Flat'] },
  { group: 'Terrenos',     options: ['Terreno / Lote', 'Lote em Condomínio'] },
  { group: 'Rural',        options: ['Área / Gleba', 'Fazenda', 'Sítio', 'Chácara'] },
  { group: 'Comercial',    options: ['Sala Comercial', 'Galpão', 'Prédio Comercial'] },
]

export const TIPOS_FLAT = TIPOS_IMOVEL.flatMap(g => g.options)

// ── CIDADES ──────────────────────────────
export const CIDADES = ['Garopaba', 'Imbituba', 'Paulo Lopes', 'Palhoça', 'Florianópolis', 'Laguna', 'Tubarão', 'Outra']

// ── STATUS IMÓVEL ─────────────────────────
export const STATUS_IMOVEL = ['Disponível', 'Em Negociação', 'Vendido', 'Locado', 'Suspenso']

// ── FINALIDADES ───────────────────────────
export const FINALIDADES = [
  { value: 'venda',        label: 'Venda' },
  { value: 'aluguel',      label: 'Aluguel' },
  { value: 'venda_aluguel', label: 'Venda / Aluguel' },
]

// ── AMENIDADES ───────────────────────────
export const AMENIDADES = [
  { id: 'piscina',         label: '🏊 Piscina' },
  { id: 'churrasqueira',   label: '🔥 Churrasqueira' },
  { id: 'vista_mar',       label: '🌊 Vista para o Mar' },
  { id: 'frente_mar',      label: '🏖 Frente ao Mar' },
  { id: 'arborizado',      label: '🌳 Arborizado' },
  { id: 'murado',          label: '🧱 Murado / Cercado' },
  { id: 'portaria',        label: '🛡 Portaria 24h' },
  { id: 'academia',        label: '💪 Academia' },
  { id: 'salao_festas',    label: '🎉 Salão de Festas' },
  { id: 'playground',      label: '🛝 Playground' },
  { id: 'area_gourmet',    label: '🍽 Área Gourmet' },
  { id: 'home_office',     label: '💻 Home Office' },
  { id: 'alarme',          label: '🔔 Alarme' },
  { id: 'cameras',         label: '📷 Câmeras' },
  { id: 'ar_condicionado', label: '❄️ Ar-Condicionado' },
  { id: 'aquecimento',     label: '♨️ Aquecimento Solar' },
  { id: 'fibra',           label: '📡 Fibra Óptica' },
  { id: 'energia_solar',   label: '☀️ Energia Solar' },
]

// ── EMOJI POR TIPO ─────────────────────────
export const TIPO_EMOJI = {
  'Terreno / Lote':       '🏞',
  'Lote em Condomínio':   '🏘',
  'Casa':                 '🏡',
  'Apartamento':          '🏢',
  'Cobertura':            '🏙',
  'Sobrado':              '🏠',
  'Fazenda':              '🌾',
  'Área / Gleba':         '🌿',
  'Sítio':                '🌻',
  'Chácara':              '🌳',
  'Sala Comercial':       '💼',
  'Galpão':               '🏭',
}

// ── ORIGENS DE LEADS ──────────────────────
export const ORIGENS_LEAD = [
  'Instagram', 'WhatsApp', 'Indicação', 'Site', 'Placa / Visita', 'Outro',
]

// ── STATUS LEADS ──────────────────────────
export const STATUS_LEAD = [
  { value: 'novo',        label: '🔵 Novo',        color: '#1a5c9a' },
  { value: 'contato',     label: '🟡 Em Contato',  color: '#b45309' },
  { value: 'visita',      label: '🟠 Visita Agendada', color: '#c05621' },
  { value: 'proposta',    label: '🟣 Proposta Enviada', color: '#6d28d9' },
  { value: 'fechado',     label: '🟢 Fechado',     color: '#065f46' },
  { value: 'perdido',     label: '🔴 Perdido',     color: '#991b1b' },
]

// ── DADOS DEMO ────────────────────────────
export const DEMO_IMOVEIS = [
  {
    id: 'I001',
    tipo: 'Terreno / Lote',
    finalidade: 'venda',
    cidade: 'Garopaba',
    bairro: 'Ferrugem',
    titulo: 'Terreno com vista privilegiada para o mar',
    desc: 'Lote plano de 500m² com vista deslumbrante para a Praia da Ferrugem. Infraestrutura completa, documentação ok.',
    area_total: '500 m²',
    valor_venda: 'R$ 580.000',
    status: 'Disponível',
    permuta: true,
    financiamento: false,
    amenidades: ['vista_mar', 'arborizado'],
    badge: 'Destaque',
    fotos: [],
  },
  {
    id: 'I002',
    tipo: 'Casa',
    finalidade: 'venda',
    cidade: 'Imbituba',
    bairro: 'Praia do Rosa',
    titulo: 'Casa de alto padrão na Praia do Rosa',
    desc: 'Casa em condomínio fechado, 4 suítes, piscina privativa, área gourmet e vista para o mar.',
    area_total: '800 m²',
    area_const: '320 m²',
    quartos: '4', suites: '4', banheiros: '5', vagas: '3',
    valor_venda: 'R$ 3.200.000',
    status: 'Disponível',
    permuta: true,
    financiamento: false,
    amenidades: ['piscina', 'vista_mar', 'churrasqueira', 'area_gourmet'],
    badge: 'Novo',
    fotos: [],
  },
  {
    id: 'I003',
    tipo: 'Área / Gleba',
    finalidade: 'venda',
    cidade: 'Paulo Lopes',
    bairro: 'Zona Rural',
    titulo: 'Área rural com acesso à lagoa',
    desc: 'Gleba de 12 hectares com nascentes e acesso à lagoa. Ideal para eco-resort ou loteamento rural.',
    area_total: '12 ha',
    valor_venda: 'R$ 1.800.000',
    status: 'Em Negociação',
    permuta: false,
    financiamento: false,
    amenidades: ['arborizado'],
    badge: '',
    fotos: [],
  },
]

export const DEMO_LEADS = [
  {
    id: 'L001',
    nome: 'Marcos Oliveira',
    tel: '48991234567',
    email: 'marcos@email.com',
    origem: 'Instagram',
    status: 'contato',
    interesse: 'Terreno / Garopaba',
    orcamento: 'R$ 600.000',
    obs: 'Busca lote perto do mar para construir casa de férias.',
    data: '2025-06-10',
    historico: ['2025-06-10 — Lead criado via Instagram'],
  },
  {
    id: 'L002',
    nome: 'Ana Paula Souza',
    tel: '48987654321',
    email: 'ana@empresa.com',
    origem: 'Indicação',
    status: 'visita',
    interesse: 'Casa / Praia do Rosa',
    orcamento: 'R$ 3.500.000',
    obs: 'Indicada pela cliente Fernanda. Muito interessada na Casa I002.',
    data: '2025-06-12',
    historico: ['2025-06-12 — Lead criado por indicação', '2025-06-14 — Visita agendada para sábado'],
  },
]

export const DEMO_VISITAS = [
  {
    id: 'V001',
    cliente: 'Ana Paula Souza',
    imovel: 'Casa alto padrão — Praia do Rosa',
    data: '2025-06-21',
    hora: '10:00',
    obs: 'Levar planta baixa e fotos aéreas.',
    status: 'Confirmada',
  },
]
