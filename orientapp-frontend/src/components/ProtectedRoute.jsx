import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function ProtectedRoute({ children, roles }) {
  const { token, user } = useAuthStore()

  if (!token) return <Navigate to="/login" replace />
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />

  // Rediriger l'admin vers /admin s'il essaie d'accéder aux routes normales
  if (!roles && user?.role === 'admin' && window.location.pathname !== '/admin' && !window.location.pathname.startsWith('/admin/')) {
    return <Navigate to="/admin" replace />
  }

  // Rediriger le conseiller vers /conseiller s'il essaie d'accéder aux routes normales
  if (!roles && user?.role === 'conseiller' && !window.location.pathname.startsWith('/conseiller')) {
    return <Navigate to="/conseiller" replace />
  }

  return children
}
