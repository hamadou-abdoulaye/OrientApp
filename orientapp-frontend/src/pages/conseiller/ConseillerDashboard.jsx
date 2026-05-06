import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import api from '../../api/axios'

export default function ConseillerDashboard() {
  const { user } = useAuthStore()

  const { data: stats } = useQuery({
    queryKey: ['conseiller-stats'],
    queryFn: () => api.get('/conseiller/stats').then(r => r.data),
  })

  const { data: etudiants } = useQuery({
    queryKey: ['conseiller-etudiants'],
    queryFn: () => api.get('/conseiller/etudiants').then(r => r.data),
  })

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  const cards = [
    { label: 'Étudiants suivis', value: stats?.total_etudiants ?? '—', icon: '👨🎓', color: 'from-blue-500 to-blue-600' },
    { label: 'Avec questionnaire', value: stats?.etudiants_avec_questionnaire ?? '—', icon: '📋', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Recommandations', value: stats?.total_recommandations ?? '—', icon: '⭐', color: 'from-orange-500 to-orange-600' },
    { label: 'Score moyen', value: stats?.moyenne_score ? `${stats.moyenne_score}%` : '—', icon: '📈', color: 'from-violet-500 to-violet-600' },
  ]

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 text-white">
        <p className="text-emerald-200 text-sm mb-1">{greeting},</p>
        <h1 className="text-3xl font-bold">{user?.name} 👋</h1>
        <p className="text-emerald-200 mt-2 text-sm">
          Suivez vos étudiants et guidez-les vers les meilleures formations.
        </p>
        <div className="mt-4">
          <Link to="/conseiller/etudiants"
            className="bg-white text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition">
            Voir mes étudiants →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
              {icon}
            </div>
            <div className="text-3xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Derniers étudiants */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800">Étudiants récents</h2>
          <Link to="/conseiller/etudiants" className="text-sm text-emerald-600 hover:underline">Voir tous</Link>
        </div>
        <div className="space-y-3">
          {etudiants?.slice(0, 5).map((e) => (
            <div key={e.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {e.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{e.name}</p>
                  <p className="text-xs text-gray-400">{e.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full ${e.questionnaires?.length > 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {e.questionnaires?.length > 0 ? 'Questionnaire rempli' : 'En attente'}
                </span>
                <span className="text-xs text-gray-400">{e.recommandations_count} reco.</span>
              </div>
            </div>
          ))}
          {(!etudiants || etudiants.length === 0) && (
            <p className="text-gray-400 text-sm text-center py-4">Aucun étudiant inscrit pour l'instant.</p>
          )}
        </div>
      </div>
    </div>
  )
}
