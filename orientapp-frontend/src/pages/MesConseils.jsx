import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'

export default function MesConseils() {
  const { data: conseils, isLoading } = useQuery({
    queryKey: ['mes-conseils'],
    queryFn: () => api.get('/mes-conseils').then(r => r.data),
  })

  const notes = conseils?.filter(c => c.type === 'note') || []
  const suggestions = conseils?.filter(c => c.type === 'suggestion') || []

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
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Mes conseils</h1>
        <p className="text-emerald-100 text-sm mt-1">{conseils?.length || 0} conseil(s) reçu(s) de votre conseiller</p>
        <div className="flex gap-4 mt-4">
          <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 text-center">
            <p className="text-xl font-bold">{suggestions.length}</p>
            <p className="text-xs text-emerald-100">Suggestions</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 text-center">
            <p className="text-xl font-bold">{notes.length}</p>
            <p className="text-xs text-emerald-100">Notes</p>
          </div>
        </div>
      </div>

      {conseils?.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-4">💬</p>
          <h2 className="font-semibold text-gray-700 mb-2">Aucun conseil reçu</h2>
          <p className="text-gray-400 text-sm">Votre conseiller n'a pas encore envoyé de conseils.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {suggestions.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Formations suggérées</h2>
              <div className="space-y-3">
                {suggestions.map(c => <ConseilCard key={c.id} conseil={c} />)}
              </div>
            </div>
          )}
          {notes.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Notes personnalisées</h2>
              <div className="space-y-3">
                {notes.map(c => <ConseilCard key={c.id} conseil={c} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ConseilCard({ conseil }) {
  const isSuggestion = conseil.type === 'suggestion'
  return (
    <div className={`rounded-2xl border-l-4 p-5 shadow-sm ${isSuggestion ? 'bg-blue-50 border-l-blue-500' : 'bg-emerald-50 border-l-emerald-500'}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${isSuggestion ? 'bg-blue-200 text-blue-800' : 'bg-emerald-200 text-emerald-800'}`}>
            {conseil.conseiller?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{conseil.conseiller?.name}</p>
            <p className="text-xs text-gray-400">{new Date(conseil.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${isSuggestion ? 'bg-blue-200 text-blue-800' : 'bg-emerald-200 text-emerald-800'}`}>
          {isSuggestion ? 'Suggestion' : 'Note'}
        </span>
      </div>

      {conseil.formation && (
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-blue-100 mb-3">
          {conseil.formation.logo_url ? (
            <img src={conseil.formation.logo_url} alt={conseil.formation.etablissement}
              className="w-10 h-10 object-contain rounded-lg"
              onError={(e) => { e.target.style.display = 'none' }} />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
              {conseil.formation.etablissement?.[0]}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-indigo-800">{conseil.formation.nom}</p>
            <p className="text-xs text-indigo-400">{conseil.formation.etablissement} — {conseil.formation.ville}</p>
          </div>
        </div>
      )}

      <p className="text-sm text-gray-700 leading-relaxed">{conseil.message}</p>
    </div>
  )
}
