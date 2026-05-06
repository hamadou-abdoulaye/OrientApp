import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/dashboard" className="text-xl font-bold tracking-wide">OrientApp</Link>
      <div className="flex items-center gap-6 text-sm">
        <Link to="/formations" className="hover:text-indigo-200">Formations</Link>
        <Link to="/questionnaire" className="hover:text-indigo-200">Questionnaire</Link>
        <Link to="/recommandations" className="hover:text-indigo-200">Recommandations</Link>
        {(user?.role === 'conseiller' || user?.role === 'admin') && (
          <Link to="/conseiller" className="hover:text-indigo-200">Conseiller</Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className="hover:text-indigo-200">Admin</Link>
        )}
        <span className="text-indigo-300">{user?.name}</span>
        <button onClick={handleLogout} className="bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded">
          Déconnexion
        </button>
      </div>
    </nav>
  )
}
