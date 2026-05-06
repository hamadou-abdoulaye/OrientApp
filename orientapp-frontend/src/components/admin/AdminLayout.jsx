import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

const links = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/formations', label: 'Formations', icon: '🎓' },
  { to: '/admin/conseillers', label: 'Conseillers', icon: '👨‍🏫' },
  { to: '/admin/etudiants', label: 'Étudiants', icon: '👨‍🎓' },
]

export default function AdminLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col fixed h-full">
        <div className="px-6 py-6 border-b border-indigo-700">
          <h1 className="text-xl font-bold">OrientApp</h1>
          <p className="text-indigo-300 text-xs mt-1">Panneau d'administration</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {links.map(({ to, label, icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-800'
                }`
              }>
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-indigo-700">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-indigo-300">Admin</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-800 rounded-lg transition">
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
