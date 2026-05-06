import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Recommandations() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['recommandations'],
    queryFn: () => api.get('/recommandations').then(r => r.data),
  })

  const toggleFavori = useMutation({
    mutationFn: (id) => api.patch(`/recommandations/${id}/favori`),
    onSuccess: () => queryClient.invalidateQueries(['recommandations']),
  })

  const favoris = data?.filter(r => r.est_favori) || []
  const autres = data?.filter(r => !r.est_favori) || []

  if (isLoading) return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 animate-pulse h-28 shadow-sm" />
      ))}
    </div>
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Mes recommandations</h1>
        <p className="text-orange-100 text-sm mt-1">{data?.length || 0} formation(s) correspondant à votre profil</p>
        <div className="flex gap-4 mt-4">
          <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 text-center">
            <p className="text-xl font-bold">{data?.length || 0}</p>
            <p className="text-xs text-orange-100">Total</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 text-center">
            <p className="text-xl font-bold">{favoris.length}</p>
            <p className="text-xs text-orange-100">Favoris</p>
          </div>
        </div>
      </div>

      {data?.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-4">🎯</p>
          <h2 className="font-semibold text-gray-700 mb-2">Aucune recommandation</h2>
          <p className="text-gray-400 text-sm mb-6">Remplissez le questionnaire pour obtenir des formations adaptées.</p>
          <Link to="/questionnaire" className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium">
            Remplir le questionnaire
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {favoris.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Mes favoris</h2>
              <div className="space-y-3">
                {favoris.map(rec => <RecCard key={rec.id} rec={rec} onToggle={() => toggleFavori.mutate(rec.id)} />)}
              </div>
            </div>
          )}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Toutes les recommandations</h2>
            <div className="space-y-3">
              {autres.map(rec => <RecCard key={rec.id} rec={rec} onToggle={() => toggleFavori.mutate(rec.id)} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RecCard({ rec, onToggle }) {
  const score = rec.score_compatibilite
  const config = score >= 70
    ? { bar: 'bg-gradient-to-r from-green-400 to-emerald-500', badge: 'bg-green-100 text-green-700', border: 'border-l-4 border-l-green-400' }
    : score >= 50
    ? { bar: 'bg-gradient-to-r from-yellow-400 to-orange-400', badge: 'bg-yellow-100 text-yellow-700', border: 'border-l-4 border-l-yellow-400' }
    : { bar: 'bg-gradient-to-r from-red-400 to-pink-400', badge: 'bg-red-100 text-red-600', border: 'border-l-4 border-l-red-400' }

  return (
    <div className={`bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 ${config.border}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {rec.formation?.logo_url ? (
            <img src={rec.formation.logo_url} alt={rec.formation.etablissement}
              className="w-12 h-12 object-contain rounded-xl border border-gray-100"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
          ) : null}
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 text-white rounded-xl flex items-center justify-center font-bold"
            style={{ display: rec.formation?.logo_url ? 'none' : 'flex' }}>
            {rec.formation?.etablissement?.[0]}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h2 className="font-semibold text-gray-800">{rec.formation?.nom}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{rec.formation?.etablissement} — {rec.formation?.ville}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={onToggle}
                className={`text-xl transition ${rec.est_favori ? 'text-yellow-400' : 'text-gray-200 hover:text-yellow-300'}`}>
                ★
              </button>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${config.badge}`}>{score}%</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
            <div className={`${config.bar} h-2 rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">{rec.justification}</p>
          <div className="flex gap-3 mt-2 text-xs text-gray-400">
            <span>{rec.formation?.duree_annees} an(s)</span>
            <span>{rec.formation?.frais_scolarite ? `${Number(rec.formation.frais_scolarite).toLocaleString()} FCFA/an` : 'Gratuit'}</span>
            <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">{rec.formation?.niveau}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
