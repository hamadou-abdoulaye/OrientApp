import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import useAuthStore from '../../store/authStore'

const links = [
  { to: '/conseiller', label: 'Tableau de bord', icon: '📊', end: true },
  { to: '/conseiller/etudiants', label: 'Mes étudiants', icon: '👨🎓' },
  { to: '/conseiller/formations', label: 'Formations', icon: '🎓' },
]

const pageImages = {
  '/conseiller':             'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&auto=format&fit=crop&q=80',
  '/conseiller/etudiants':   'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&auto=format&fit=crop&q=80',
  '/conseiller/formations':  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&auto=format&fit=crop&q=80',
}

export default function ConseillerLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentImage = Object.entries(pageImages)
    .sort((a, b) => b[0].length - a[0].length)
    .find(([path]) => location.pathname === path || location.pathname.startsWith(path + '/'))
    ?.[1] || pageImages['/conseiller']

  const handleLogout = async () => { await logout(); navigate('/login') }

  const SidebarContent = () => (
    <>
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-lg">O</div>
          <div>
            <h1 className="text-base font-bold text-white">OrientApp</h1>
            <p className="text-xs text-white/60">Espace Conseiller</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map(({ to, label, icon, end }) => (
          <NavLink key={to} to={to} end={end} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition font-medium ${
                isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}>
            <span>{icon}</span><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold text-white">{user?.name?.[0]?.toUpperCase()}</div>
          <div><p className="text-sm font-medium text-white">{user?.name}</p><p className="text-xs text-white/60">Conseiller</p></div>
        </div>
        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition">🚪 Déconnexion</button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen relative">
      <img src={currentImage} key={currentImage} alt="" className="fixed inset-0 w-full h-full object-cover z-0 transition-opacity duration-700" />
      <div className="fixed inset-0 bg-emerald-950/75 z-0" />

      <aside className="hidden md:flex w-64 bg-white/10 backdrop-blur-md flex-col fixed h-full z-30 border-r border-white/10">
        <SidebarContent />
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-emerald-900/95 backdrop-blur-md flex flex-col z-50 transform transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      <main className="relative z-10 md:ml-64 flex-1 p-4 md:p-8 min-h-screen pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white font-bold text-lg">☰</button>
          <span className="font-bold text-white">OrientApp</span>
          <div className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center font-bold text-sm">{user?.name?.[0]?.toUpperCase()}</div>
        </div>
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-emerald-900/90 backdrop-blur-md border-t border-white/10 z-30 md:hidden">
        <div className="flex justify-around items-center py-2">
          {links.map(({ to, icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `flex flex-col items-center gap-0.5 px-2 py-1 text-xs transition ${isActive ? 'text-white font-semibold' : 'text-white/50'}`}>
              <span className="text-xl">{icon}</span><span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
