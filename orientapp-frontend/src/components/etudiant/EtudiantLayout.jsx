import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAuthStore from '../../store/authStore'
import api from '../../api/axios'

const links = [
  { to: '/dashboard', label: 'Accueil', icon: '🏠', end: true, activeBg: 'bg-white text-indigo-700 shadow-sm', dot: 'bg-indigo-500' },
  { to: '/questionnaire', label: 'Questionnaire', icon: '📋', activeBg: 'bg-white text-purple-700 shadow-sm', dot: 'bg-purple-500' },
  { to: '/recommandations', label: 'Recommandations', icon: '⭐', activeBg: 'bg-white text-orange-600 shadow-sm', dot: 'bg-orange-500' },
  { to: '/formations', label: 'Formations', icon: '🎓', activeBg: 'bg-white text-cyan-700 shadow-sm', dot: 'bg-cyan-500' },
  { to: '/mes-conseils', label: 'Mes conseils', icon: '💬', activeBg: 'bg-white text-emerald-700 shadow-sm', dot: 'bg-emerald-500' },
  { to: '/profil', label: 'Mon profil', icon: '👤', activeBg: 'bg-white text-pink-700 shadow-sm', dot: 'bg-pink-500' },
]

export default function EtudiantLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const { data: nonLus } = useQuery({
    queryKey: ['non-lus'],
    queryFn: () => api.get('/mes-conseils/non-lus').then(r => r.data),
    refetchInterval: 30000,
  })

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 flex flex-col fixed h-full shadow-xl">

        {/* Logo */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow">
              O
            </div>
            <div>
              <h1 className="text-base font-bold text-white">OrientApp</h1>
              <p className="text-xs text-indigo-200">Espace étudiant</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          {links.map(({ to, label, icon, end, activeBg }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition font-medium ${
                  isActive ? activeBg : 'text-indigo-100 hover:bg-white hover:bg-opacity-10'
                }`
              }>
              <span className="text-base">{icon}</span>
              <span>{label}</span>
              {to === '/mes-conseils' && nonLus?.count > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {nonLus.count}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profil */}
        <div className="px-4 py-5">
          <div className="bg-white bg-opacity-10 rounded-2xl p-3 mb-3">
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img src={`http://127.0.0.1:8000/storage/${user.avatar}`} alt={user.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white border-opacity-40" />
              ) : (
                <div className="w-10 h-10 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 border-2 border-white border-opacity-30">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-indigo-200 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-indigo-200 hover:bg-white hover:bg-opacity-10 rounded-xl transition">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
