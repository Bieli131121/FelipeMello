# Felipe Mello Imóveis — React Vite

Conversão completa dos arquivos HTML originais para um projeto **React + Vite** modular, com melhorias significativas de arquitetura, manutenibilidade e UX.

---

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## 📁 Estrutura

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.jsx       # Barra de navegação do site público
│   ├── Hero.jsx         # Seção hero com busca
│   ├── PropertyCard.jsx # Card de imóvel (site público)
│   ├── ListingSection.jsx # Grid de imóveis com filtros
│   ├── Sidebar.jsx      # Sidebar do painel ADM
│   ├── Dashboard.jsx    # KPIs e pipeline de leads
│   ├── AdminImoveis.jsx # Gestão de imóveis (grid + tabela)
│   ├── AdminLeads.jsx   # CRM de leads
│   ├── AdminAgenda.jsx  # Agenda de visitas
│   ├── ImovelForm.jsx   # Wizard de cadastro/edição de imóvel
│   ├── Modal.jsx        # Modal reutilizável
│   └── Toast.jsx        # Notificações toast
├── pages/
│   ├── PublicSite.jsx   # Site público completo
│   └── AdminPanel.jsx   # Painel ADM
├── hooks/
│   └── index.js         # useLocalStorage + useToast
├── data/
│   └── constants.js     # Tipos, cidades, amenidades, dados demo
├── utils/
│   └── index.js         # Helpers: formatBRL, statusClass, etc.
├── styles/
│   └── global.css       # CSS global: variáveis, reset, botões, badges
└── App.jsx              # Raiz: estado global, roteamento pub/adm
```

---

## ✅ Melhorias implementadas

### Arquitetura
- **Separação de responsabilidades**: lógica, estilo e markup separados em arquivos distintos
- **CSS Modules** por componente: elimina colisões de classe e facilita refatoração
- **Estado centralizado** em `App.jsx` com props para baixo — sem variáveis globais
- **`useLocalStorage` customizado**: substitui todos os `localStorage.getItem/setItem` espalhados no HTML por um hook reutilizável com sincronização automática
- **`useToast` customizado**: elimina a manipulação imperativa do DOM para toasts

### UX / Funcionalidades
- **Fechar modal com Escape** (não havia no HTML original)
- **Fechar modal clicando fora** (preservado e melhorado)
- **Pipeline visual de leads** no Dashboard com barras de progresso animadas
- **Agenda com separação Próximas / Realizadas** (datas passadas ficam em seção separada, com opacidade reduzida)
- **Formulário de contato** no site público abre modal pré-preenchido com dados do imóvel e redireciona para WhatsApp
- **Busca no Hero** faz scroll suave até a seção de imóveis

### Código
- **Dados de exemplo centralizados** em `constants.js` (não mais hardcoded no HTML)
- **Funções utilitárias** (`formatBRL`, `statusClass`, `tipoEmoji`, etc.) em `utils/index.js`
- **Sem `document.getElementById`** ou manipulação direta do DOM
- **Nenhuma variável global** (`leads`, `imoveis`, `visitas` eram variáveis globais no HTML)
- **Sem `innerHTML` gerado manualmente** — tudo é JSX declarativo
- **IDs de componentes únicos** gerados por `genId()` de forma consistente

### Performance
- Filtros com `useMemo` para evitar re-cálculos desnecessários
- Componentes pequenos e focados — re-renders localizados
- CSS modular com zero CSS-in-JS overhead

---

## 🔧 Próximos passos sugeridos

- Adicionar **React Router** se quiser URLs por página (`/imoveis`, `/admin`)
- Integrar **Supabase** ou **Firebase** para persistência real (substituir `localStorage`)
- Upload de fotos para **Cloudinary** ou **S3** (hoje salvo em base64 no localStorage)
- Adicionar **autenticação** no painel ADM (hoje acessível sem senha)
- **react-query** para cache e sincronização de dados com backend
