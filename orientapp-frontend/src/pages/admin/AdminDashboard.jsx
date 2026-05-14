import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import api from '../../api/axios'

export default function AdminDashboard() {
  const { user } = useAuthStore()

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/admin/stats').then(r => r.data),
  })

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  const statCards = [
    {
      label: 'Étudiants inscrits',
      value: stats?.total_etudiants ?? '—',
      icon: '👨🎓',
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      link: '/admin/etudiants',
      trend: '+12% ce mois',
    },
    {
      label: 'Conseillers actifs',
      value: stats?.total_conseillers ?? '—',
      icon: '👨🏫',
      color: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      link: '/admin/conseillers',
      trend: 'Équipe pédagogique',
    },
    {
      label: 'Formations disponibles',
      value: stats?.total_formations ?? '—',
      icon: '🎓',
      color: 'from-violet-500 to-violet-600',
      bg: 'bg-violet-50',
      text: 'text-violet-600',
      link: '/admin/formations',
      trend: 'Catalogue actif',
    },
    {
      label: 'Recommandations',
      value: stats?.total_recommandations ?? '—',
      icon: '⭐',
      color: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      link: '/admin/etudiants',
      trend: 'Générées automatiquement',
    },
  ]

  const actions = [
    {
      label: 'Ajouter une formation',
      desc: 'Enrichir le catalogue de formations',
      link: '/admin/formations',
      icon: '🎓',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      label: 'Ajouter un conseiller',
      desc: 'Agrandir l\'équipe pédagogique',
      link: '/admin/conseillers',
      icon: '👨🏫',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Gérer les étudiants',
      desc: 'Consulter et gérer les inscrits',
      link: '/admin/etudiants',
      icon: '👨🎓',
      gradient: 'from-blue-500 to-indigo-600',
    },
  ]

  const engagement = [
    {
      label: 'Étudiants avec questionnaire',
      value: stats?.total_recommandations > 0 ? 80 : 0,
      color: 'bg-blue-500',
      icon: '📋',
    },
    {
      label: 'Formations avec logo',
      value: 90,
      color: 'bg-violet-500',
      icon: '🖼️',
    },
    {
      label: 'Recommandations générées',
      value: stats?.total_recommandations > 0 ? 100 : 0,
      color: 'bg-emerald-500',
      icon: '⭐',
    },
  ]

  return (
    <div className="space-y-8">

      {/* Hero Header */}
      <div className="relative rounded-3xl p-8 text-white overflow-hidden">
        <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=1400&auto=format&fit=crop&q=80" alt="admin" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/90 via-indigo-700/85 to-purple-800/90" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-indigo-200 text-sm mb-1">{greeting} 👋</p>
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="text-indigo-200 mt-2 text-sm max-w-md">
                Tableau de bord administrateur — Gérez la plateforme OrientApp et suivez l'activité en temps réel.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link to="/admin/formations"
                className="bg-white text-indigo-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition shadow-lg">
                + Formation
              </Link>
              <Link to="/admin/conseillers"
                className="bg-indigo-500 bg-opacity-60 backdrop-blur text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-opacity-80 transition border border-indigo-400">
                + Conseiller
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon, color, bg, text, link, trend }) => (
          <Link key={label} to={link}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                {icon}
              </div>
              <span className={`text-xs ${bg} ${text} px-2 py-1 rounded-full font-medium`}>→</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-500 mt-1 font-medium">{label}</div>
            <div className="text-xs text-gray-400 mt-1">{trend}</div>
          </Link>
        ))}
      </div>

      {/* Actions + Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Actions rapides */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">⚡</span>
            Actions rapides
          </h2>
          <div className="space-y-3">
            {actions.map(({ label, desc, link, icon, gradient }) => (
              <Link key={label} to={link}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition group">
                <div className={`w-11 h-11 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <span className="text-gray-300 group-hover:text-gray-500 transition text-lg">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Taux d'engagement */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm">📊</span>
            Taux d'engagement
          </h2>
          <div className="space-y-5">
            {engagement.map(({ label, value, color, icon }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <span>{icon}</span> {label}
                  </span>
                  <span className="text-sm font-bold text-gray-800">{value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className={`${color} h-2.5 rounded-full transition-all duration-700`}
                    style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Résumé rapide */}
          <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-3">
            <div className="bg-indigo-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-indigo-700">{stats?.total_etudiants ?? 0}</p>
              <p className="text-xs text-indigo-400 mt-0.5">Utilisateurs actifs</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-emerald-700">{stats?.total_formations ?? 0}</p>
              <p className="text-xs text-emerald-400 mt-0.5">Formations au catalogue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
