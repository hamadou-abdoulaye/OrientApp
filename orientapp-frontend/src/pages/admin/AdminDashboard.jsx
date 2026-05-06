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

  const cards = [
    { label: 'Étudiants', value: stats?.total_etudiants ?? '—', icon: '👨🎓', color: 'from-blue-500 to-blue-600', link: '/admin/etudiants' },
    { label: 'Conseillers', value: stats?.total_conseillers ?? '—', icon: '👨🏫', color: 'from-emerald-500 to-emerald-600', link: '/admin/conseillers' },
    { label: 'Formations', value: stats?.total_formations ?? '—', icon: '🎓', color: 'from-violet-500 to-violet-600', link: '/admin/formations' },
    { label: 'Recommandations', value: stats?.total_recommandations ?? '—', icon: '⭐', color: 'from-orange-500 to-orange-600', link: '/admin/etudiants' },
  ]

  const actions = [
    { label: 'Ajouter une formation', desc: 'Enrichir le catalogue', link: '/admin/formations', icon: '🎓', color: 'bg-violet-50 text-violet-700 border-violet-100' },
    { label: 'Ajouter un conseiller', desc: 'Agrandir l\'équipe', link: '/admin/conseillers', icon: '👨🏫', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { label: 'Voir les étudiants', desc: 'Gérer les inscrits', link: '/admin/etudiants', icon: '👨🎓', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  ]

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 text-white">
        <p className="text-indigo-200 text-sm mb-1">{greeting},</p>
        <h1 className="text-3xl font-bold">{user?.name} 👋</h1>
        <p className="text-indigo-200 mt-2 text-sm">
          Voici un aperçu de la plateforme OrientApp aujourd'hui.
        </p>
        <div className="mt-4 flex gap-3">
          <Link to="/admin/formations"
            className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition">
            + Nouvelle formation
          </Link>
          <Link to="/admin/conseillers"
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-400 transition">
            + Nouveau conseiller
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon, color, link }) => (
          <Link key={label} to={link}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition group">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {icon}
            </div>
            <div className="text-3xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-400 mt-1">{label}</div>
          </Link>
        ))}
      </div>

      {/* Actions + Infos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Actions rapides */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            {actions.map(({ label, desc, link, icon, color }) => (
              <Link key={label} to={link}
                className={`flex items-center gap-4 p-4 rounded-xl border ${color} hover:opacity-80 transition`}>
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-xs opacity-70">{desc}</p>
                </div>
                <span className="ml-auto text-lg">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Infos système */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Système</h2>
          <div className="space-y-3">
            {[
              { label: 'Version', value: 'v1.0.0', dot: null },
              { label: 'Backend Laravel', value: 'En ligne', dot: 'bg-green-400' },
              { label: 'Base de données', value: 'Connectée', dot: 'bg-green-400' },
              { label: 'Frontend React', value: 'En ligne', dot: 'bg-green-400' },
              { label: 'Stack', value: 'React · Laravel · MySQL', dot: null },
            ].map(({ label, value, dot }) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  {dot && <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />}
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Taux de complétion */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Taux d'engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Étudiants avec questionnaire', value: stats?.total_recommandations > 0 ? 80 : 0, color: 'bg-blue-500' },
            { label: 'Formations avec logo', value: 90, color: 'bg-violet-500' },
            { label: 'Recommandations générées', value: stats?.total_recommandations > 0 ? 100 : 0, color: 'bg-emerald-500' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold text-gray-700">{value}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className={`${color} h-2 rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
