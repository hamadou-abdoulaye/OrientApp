import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Formations from './pages/Formations'
import Questionnaire from './pages/Questionnaire'
import Recommandations from './pages/Recommandations'
import MesConseils from './pages/MesConseils'
import Profil from './pages/Profil'
import FormationDetail from './pages/FormationDetail'
import ConseillerLayout from './components/conseiller/ConseillerLayout'
import EtudiantLayout from './components/etudiant/EtudiantLayout'
import ConseillerDashboard from './pages/conseiller/ConseillerDashboard'
import ConseillerEtudiants from './pages/conseiller/ConseillerEtudiants'
import ConseillerFormations from './pages/conseiller/ConseillerFormations'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminFormations from './pages/admin/AdminFormations'
import AdminConseillers from './pages/admin/AdminConseillers'
import AdminEtudiants from './pages/admin/AdminEtudiants'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes étudiants */}
          <Route path="/" element={<ProtectedRoute><EtudiantLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="formations" element={<Formations />} />
            <Route path="questionnaire" element={<Questionnaire />} />
            <Route path="recommandations" element={<Recommandations />} />
            <Route path="mes-conseils" element={<MesConseils />} />
            <Route path="profil" element={<Profil />} />
            <Route path="formations/:id" element={<FormationDetail />} />
          </Route>

          {/* Routes conseiller avec sidebar */}
          <Route path="/conseiller" element={
            <ProtectedRoute roles={['conseiller']}><ConseillerLayout /></ProtectedRoute>
          }>
            <Route index element={<ConseillerDashboard />} />
            <Route path="etudiants" element={<ConseillerEtudiants />} />
            <Route path="formations" element={<ConseillerFormations />} />
          </Route>

          {/* Routes admin avec sidebar */}
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="formations" element={<AdminFormations />} />
            <Route path="conseillers" element={<AdminConseillers />} />
            <Route path="etudiants" element={<AdminEtudiants />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
