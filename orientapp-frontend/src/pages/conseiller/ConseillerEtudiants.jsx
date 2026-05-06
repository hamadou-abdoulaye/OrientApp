import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from '../../api/axios'

export default function ConseillerEtudiants() {
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('profil') // profil | conseils
  const queryClient = useQueryClient()

  const { data: etudiants, isLoading } = useQuery({
    queryKey: ['conseiller-etudiants'],
    queryFn: () => api.get('/conseiller/etudiants').then(r => r.data),
  })

  const { data: detail } = useQuery({
    queryKey: ['conseiller-etudiant', selected],
    queryFn: () => api.get(`/conseiller/etudiants/${selected}`).then(r => r.data),
    enabled: !!selected,
  })

  const { data: formations } = useQuery({
    queryKey: ['formations'],
    queryFn: () => api.get('/formations').then(r => r.data),
  })

  const { data: conseils } = useQuery({
    queryKey: ['conseils-etudiant', selected],
    queryFn: () => api.get(`/conseils/etudiant/${selected}`).then(r => r.data),
    enabled: !!selected,
  })

  const { register, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm({
    defaultValues: { type: 'note' }
  })

  const sendConseil = useMutation({
    mutationFn: (d) => api.post('/conseils', { ...d, etudiant_id: selected }),
    onSuccess: () => {
      queryClient.invalidateQueries(['conseils-etudiant', selected])
      reset({ type: 'note' })
    },
  })

  const deleteConseil = useMutation({
    mutationFn: (id) => api.delete(`/conseils/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['conseils-etudiant', selected]),
  })

  const type = watch('type')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Mes étudiants</h1>
        <p className="text-gray-500 text-sm mt-1">{etudiants?.length || 0} étudiant(s) inscrit(s)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Liste */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-700 text-sm mb-3">Liste des étudiants</h2>
          {isLoading ? <p className="text-gray-400 text-sm">Chargement...</p> : (
            <ul className="space-y-2">
              {etudiants?.map((e) => (
                <li key={e.id}>
                  <button onClick={() => { setSelected(e.id); setTab('profil') }}
                    className={`w-full text-left px-3 py-3 rounded-xl transition ${selected === e.id ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {e.name[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{e.name}</p>
                        <p className="text-xs text-gray-400 truncate">{e.email}</p>
                      </div>
                      <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${e.recommandations_count > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {e.recommandations_count}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
              {etudiants?.length === 0 && <p className="text-gray-400 text-sm">Aucun étudiant.</p>}
            </ul>
          )}
        </div>

        {/* Détail */}
        <div className="md:col-span-2 space-y-4">
          {!selected ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-4xl mb-3">👈</p>
              <p className="text-gray-400 text-sm">Sélectionnez un étudiant</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex gap-2">
                {['profil', 'conseils'].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${tab === t ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                    {t === 'profil' ? '👤 Profil' : `💬 Conseils (${conseils?.length || 0})`}
                  </button>
                ))}
              </div>

              {tab === 'profil' && detail && (
                <>
                  {/* Profil */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-xl">
                        {detail.etudiant.name[0].toUpperCase()}
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-800 text-lg">{detail.etudiant.name}</h2>
                        <p className="text-sm text-gray-400">{detail.etudiant.email}</p>
                      </div>
                    </div>

                    {detail.questionnaire ? (
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Série Bac', value: detail.questionnaire.serie_bac },
                          { label: 'Moyenne', value: `${detail.questionnaire.moyenne_generale}/20` },
                          { label: 'Ville souhaitée', value: detail.questionnaire.ville_souhaitee || 'Non précisée' },
                          { label: 'Budget/mois', value: detail.questionnaire.budget_mensuel ? `${Number(detail.questionnaire.budget_mensuel).toLocaleString()} FCFA` : 'Non précisé' },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-400">{label}</p>
                            <p className="text-sm font-semibold text-gray-700 mt-0.5">{value}</p>
                          </div>
                        ))}
                        <div className="col-span-2 bg-gray-50 rounded-xl p-3">
                          <p className="text-xs text-gray-400 mb-1">Matières préférées</p>
                          <div className="flex flex-wrap gap-1">
                            {detail.questionnaire.matieres_preferees?.map(m => (
                              <span key={m} className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">{m}</span>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-2 bg-gray-50 rounded-xl p-3">
                          <p className="text-xs text-gray-400 mb-1">Centres d'intérêt</p>
                          <div className="flex flex-wrap gap-1">
                            {detail.questionnaire.centres_interet?.map(c => (
                              <span key={c} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{c}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-700">
                        ⚠️ Cet étudiant n'a pas encore rempli son questionnaire.
                      </div>
                    )}
                  </div>

                  {/* Recommandations */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Recommandations ({detail.recommandations?.length})</h3>
                    <div className="space-y-2">
                      {detail.recommandations?.map((rec) => (
                        <div key={rec.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{rec.formation?.nom}</p>
                            <p className="text-xs text-gray-400">{rec.formation?.etablissement} — {rec.formation?.ville}</p>
                          </div>
                          <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                            rec.score_compatibilite >= 70 ? 'bg-green-100 text-green-700' :
                            rec.score_compatibilite >= 50 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {rec.score_compatibilite}%
                          </span>
                        </div>
                      ))}
                      {detail.recommandations?.length === 0 && <p className="text-gray-400 text-sm">Aucune recommandation.</p>}
                    </div>
                  </div>
                </>
              )}

              {tab === 'conseils' && (
                <>
                  {/* Formulaire conseil */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Envoyer un conseil</h3>
                    <form onSubmit={handleSubmit(d => sendConseil.mutate(d))} className="space-y-4">
                      <div className="flex gap-3">
                        {[
                          { value: 'note', label: '📝 Note personnalisée' },
                          { value: 'suggestion', label: '🎓 Suggérer une formation' },
                        ].map(({ value, label }) => (
                          <label key={value} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition text-sm font-medium ${type === value ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                            <input {...register('type')} type="radio" value={value} className="hidden" />
                            {label}
                          </label>
                        ))}
                      </div>

                      {type === 'suggestion' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Formation suggérée</label>
                          <select {...register('formation_id')} className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
                            <option value="">Sélectionner une formation...</option>
                            {formations?.data?.map(f => (
                              <option key={f.id} value={f.id}>{f.nom} — {f.etablissement}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea {...register('message', { required: true })} rows={4}
                          placeholder={type === 'note' ? 'Écrivez votre conseil personnalisé...' : 'Expliquez pourquoi vous suggérez cette formation...'}
                          className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
                      </div>

                      <button type="submit" disabled={isSubmitting}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-medium transition">
                        {isSubmitting ? 'Envoi...' : '📤 Envoyer le conseil'}
                      </button>
                    </form>
                  </div>

                  {/* Historique conseils */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Historique ({conseils?.length || 0})</h3>
                    <div className="space-y-3">
                      {conseils?.map((c) => (
                        <div key={c.id} className={`p-4 rounded-xl border ${c.type === 'suggestion' ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{c.type === 'suggestion' ? '🎓' : '📝'}</span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.type === 'suggestion' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'}`}>
                                {c.type === 'suggestion' ? 'Suggestion' : 'Note'}
                              </span>
                              {c.formation && <span className="text-xs text-blue-600 font-medium">{c.formation.nom}</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString('fr-FR')}</span>
                              <button onClick={() => deleteConseil.mutate(c.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{c.message}</p>
                        </div>
                      ))}
                      {conseils?.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Aucun conseil envoyé pour l'instant.</p>}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
