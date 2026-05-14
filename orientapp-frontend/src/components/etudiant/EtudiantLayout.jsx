import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAuthStore from '../../store/authStore'
import api from '../../api/axios'

const links = [
  { to: '/dashboard', label: 'Accueil', icon: '🏠', end: true },
  { to: '/questionnaire', label: 'Questionnaire', icon: '📋' },
  { to: '/recommandations', label: 'Recommandations', icon: '⭐' },
  { to: '/formations', label: 'Formations', icon: '🎓' },
  { to: '/mes-conseils', label: 'Mes conseils', icon: '💬' },
  { to: '/profil', label: 'Mon profil', icon: '👤' },
]

const pageImages = {
  '/dashboard':       'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1920&auto=format&fit=crop&q=80',
  '/questionnaire':   'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1920&auto=format&fit=crop&q=80',
  '/recommandations': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&auto=format&fit=crop&q=80',
  '/formations':      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&auto=format&fit=crop&q=80',
  '/mes-conseils':    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&auto=format&fit=crop&q=80',
  '/profil':          'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1920&auto=format&fit=crop&q=80',
}

export default function EtudiantLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentImage = Object.entries(pageImages)
    .sort((a, b) => b[0].length - a[0].length)
    .find(([path]) => location.pathname === path || location.pathname.startsWith(path + '/'))
    ?.[1] || pageImages['/dashboard']

  const { data: nonLus } = useQuery({
    queryKey: ['non-lus'],
    queryFn: () => api.get('/mes-conseils/non-lus').then(r => r.data),
    refetchInterval: 30000,
  })
  

  const handleLogout = async () => { await logout(); navigate('/login') }

  const SidebarContent = () => (
    <>
      <div className="px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow">O</div>
          <div>
            <h1 className="text-base font-bold text-white">OrientApp</h1>
            <p className="text-xs text-white/60">Espace étudiant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {links.map(({ to, label, icon, end, activeBg }) => (
          <NavLink key={to} to={to} end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition font-medium ${
                isActive ? activeBg : 'text-white/70 hover:bg-white/10 hover:text-white'
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

      <div className="px-4 py-5">
        <div className="bg-white/10 rounded-2xl p-3 mb-3">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img src={`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/storage/${user.avatar}`}
                alt={user.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white/40" />
            ) : (
              <div className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs text-white/60 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition">
          Déconnexion
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen relative">

      {/* Image de fond pleine page — change selon la route */}
      <img
        key={currentImage}
        src={currentImage}
        alt=""
        className="fixed inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
      />
      <div className="fixed inset-0 bg-indigo-950/70 z-0" />

      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 bg-white/10 backdrop-blur-md flex-col fixed h-full shadow-xl z-30 border-r border-white/10">
        <SidebarContent />
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar mobile */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-indigo-900/95 backdrop-blur-md flex flex-col z-50 transform transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <main className="relative z-10 md:ml-64 flex-1 p-4 md:p-8 min-h-screen pb-24 md:pb-8">

        {/* Header mobile */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white font-bold text-lg">
            ☰
          </button>
          <span className="font-bold text-white">OrientApp</span>
          <div className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {user?.name?.[0]?.toUpperCase()}
          </div>
        </div>

        <Outlet />
      </main>

      {/* Bottom nav mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-indigo-900/90 backdrop-blur-md border-t border-white/10 z-30 md:hidden">
        <div className="flex justify-around items-center py-2">
          {links.map(({ to, icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-xs transition ${
                  isActive ? 'text-white font-semibold' : 'text-white/50'
                }`
              }>
              <span className="text-xl relative">
                {icon}
                {to === '/mes-conseils' && nonLus?.count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {nonLus.count}
                  </span>
                )}
              </span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
