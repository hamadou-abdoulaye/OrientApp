import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'

export default function Conseiller() {
  const [selected, setSelected] = useState(null)

  const { data: stats } = useQuery({
    queryKey: ['conseiller-stats'],
    queryFn: () => api.get('/conseiller/stats').then(r => r.data),
  })

  const { data: etudiants, isLoading } = useQuery({
    queryKey: ['conseiller-etudiants'],
    queryFn: () => api.get('/conseiller/etudiants').then(r => r.data),
  })

  const { data: detail } = useQuery({
    queryKey: ['conseiller-etudiant', selected],
    queryFn: () => api.get(`/conseiller/etudiants/${selected}`).then(r => r.data),
    enabled: !!selected,
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Espace Conseiller</h1>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Étudiants', value: stats.total_etudiants },
            { label: 'Avec questionnaire', value: stats.etudiants_avec_questionnaire },
            { label: 'Recommandations', value: stats.total_recommandations },
            { label: 'Score moyen', value: `${stats.moyenne_score}%` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{value}</div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Liste étudiants */}
        <div className="md:col-span-1 bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-gray-700 mb-3">Étudiants ({etudiants?.length || 0})</h2>
          {isLoading ? <p className="text-gray-400 text-sm">Chargement...</p> : (
            <ul className="space-y-2">
              {etudiants?.map((e) => (
                <li key={e.id}>
                  <button onClick={() => setSelected(e.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${selected === e.id ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-50'}`}>
                    <div className="font-medium">{e.name}</div>
                    <div className="text-gray-400 text-xs">{e.email} · {e.recommandations_count} reco.</div>
                  </button>
                </li>
              ))}
              {etudiants?.length === 0 && <p className="text-gray-400 text-sm">Aucun étudiant</p>}
            </ul>
          )}
        </div>

        {/* Détail étudiant */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
          {!selected ? (
            <p className="text-gray-400 text-sm">Sélectionnez un étudiant pour voir son profil</p>
          ) : detail ? (
            <div>
              <h2 className="font-semibold text-gray-800 mb-1">{detail.etudiant.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{detail.etudiant.email}</p>

              {detail.questionnaire ? (
                <div className="mb-4 bg-gray-50 rounded-lg p-3 text-sm">
                  <p><span className="font-medium">Série :</span> {detail.questionnaire.serie_bac}</p>
                  <p><span className="font-medium">Moyenne :</span> {detail.questionnaire.moyenne_generale}/20</p>
                  <p><span className="font-medium">Ville souhaitée :</span> {detail.questionnaire.ville_souhaitee || 'Non précisée'}</p>
                  <p><span className="font-medium">Matières :</span> {detail.questionnaire.matieres_preferees?.join(', ')}</p>
                  <p><span className="font-medium">Intérêts :</span> {detail.questionnaire.centres_interet?.join(', ')}</p>
                </div>
              ) : (
                <p className="text-sm text-yellow-600 mb-4">Questionnaire non rempli</p>
              )}

              <h3 className="font-medium text-gray-700 mb-2">Recommandations</h3>
              <div className="space-y-2">
                {detail.recommandations?.map((rec) => (
                  <div key={rec.id} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 text-sm">
                    <div>
                      <span className="font-medium">{rec.formation?.nom}</span>
                      <span className="text-gray-400 ml-2">{rec.formation?.etablissement}</span>
                    </div>
                    <span className="text-indigo-600 font-bold">{rec.score_compatibilite}%</span>
                  </div>
                ))}
                {detail.recommandations?.length === 0 && <p className="text-gray-400 text-sm">Aucune recommandation</p>}
              </div>
            </div>
          ) : <p className="text-gray-400 text-sm">Chargement...</p>}
        </div>
      </div>
    </div>
  )
}
