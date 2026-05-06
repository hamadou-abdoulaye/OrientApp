import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

const links = [
  { to: '/conseiller', label: 'Tableau de bord', icon: '📊', end: true },
  { to: '/conseiller/etudiants', label: 'Mes étudiants', icon: '👨🎓' },
  { to: '/conseiller/formations', label: 'Formations', icon: '🎓' },
]

export default function ConseillerLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white flex flex-col fixed h-full">
        <div className="px-6 py-6 border-b border-emerald-700">
          <h1 className="text-xl font-bold">OrientApp</h1>
          <p className="text-emerald-300 text-xs mt-1">Espace Conseiller</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {links.map(({ to, label, icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${
                  isActive ? 'bg-emerald-600 text-white' : 'text-emerald-200 hover:bg-emerald-800'
                }`
              }>
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-emerald-700">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-emerald-300">Conseiller</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-800 rounded-lg transition">
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
