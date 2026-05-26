import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import PublicSite  from './pages/PublicSite'
import AdminPanel  from './pages/AdminPanel'
import ImovelPage  from './pages/ImovelPage'
import ToastContainer from './components/Toast'
import { useLocalStorage, useToast } from './hooks'
import { DEMO_IMOVEIS, DEMO_LEADS, DEMO_VISITAS } from './data/constants'
import './styles/global.css'

// ── Inner app needs access to router hooks ────────────────────────────────
function AppInner() {
  const navigate = useNavigate()

  const [imoveis,  setImoveis]  = useLocalStorage('fm_imoveis',  DEMO_IMOVEIS)
  const [leads,    setLeads]    = useLocalStorage('fm_leads',    DEMO_LEADS)
  const [visitas,  setVisitas]  = useLocalStorage('fm_visitas',  DEMO_VISITAS)

  const { toasts, toast } = useToast()

  return (
    <>
      <Routes>
        {/* ── Public site ─────────────────────────── */}
        <Route
          path="/"
          element={
            <PublicSite
              imoveis={imoveis}
              onAdmClick={() => navigate('/admin')}
              toast={toast}
            />
          }
        />

        {/* ── Individual property listing page ─────── */}
        <Route
          path="/imovel/:slug"
          element={
            <ImovelPage
              imoveis={imoveis}
              toast={toast}
            />
          }
        />

        {/* ── Admin panel ─────────────────────────── */}
        <Route
          path="/admin"
          element={
            <AdminPanel
              imoveis={imoveis}
              leads={leads}
              visitas={visitas}
              onImoveisChange={setImoveis}
              onLeadsChange={setLeads}
              onVisitasChange={setVisitas}
              toast={toast}
              onClose={() => navigate('/')}
            />
          }
        />
        <Route path="/admin/*" element={
          <AdminPanel
            imoveis={imoveis}
            leads={leads}
            visitas={visitas}
            onImoveisChange={setImoveis}
            onLeadsChange={setLeads}
            onVisitasChange={setVisitas}
            toast={toast}
            onClose={() => navigate('/')}
          />
        } />
      </Routes>

      <ToastContainer toasts={toasts} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
