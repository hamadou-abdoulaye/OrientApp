import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'
import useAuthStore from '../store/authStore'
import ImageUpload from '../components/ImageUpload'

const niveauColors = {
  Licence: 'bg-blue-100 text-blue-700',
  Master: 'bg-purple-100 text-purple-700',
  BTS: 'bg-orange-100 text-orange-700',
  DUT: 'bg-cyan-100 text-cyan-700',
  Doctorat: 'bg-red-100 text-red-700',
  Autre: 'bg-gray-100 text-gray-600',
}

export default function FormationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: formation, isLoading } = useQuery({
    queryKey: ['formation', id],
    queryFn: () => api.get(`/formations/${id}`).then(r => r.data),
  })

  const { user } = useAuthStore()

  const toggleInteret = useMutation({
    mutationFn: () => api.post(`/formations/${id}/interet`),
    onSuccess: () => queryClient.invalidateQueries(['formation', id]),
  })

  if (isLoading) return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-24 shadow-sm" />)}
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Bouton retour */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition">
        ← Retour
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        {/* Bannière image */}
        {(formation.image_url || user?.role === 'admin') && (
          <div className="mb-5 rounded-xl overflow-hidden bg-gray-100 h-48 relative">
            {formation.image_url ? (
              <img src={formation.image_url} alt={formation.nom} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <span className="text-gray-300 text-sm">Aucune image de couverture</span>
              </div>
            )}
            {user?.role === 'admin' && (
              <div className="absolute bottom-3 right-3">
                <ImageUpload
                  url={null}
                  shape="rounded-lg"
                  size="w-10 h-10"
                  placeholder="📷"
                  onSuccess={{
                    uploadUrl: `/upload/formation/${id}/image`,
                    callback: () => queryClient.invalidateQueries(['formation', id])
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div className="flex gap-5 items-start">
          <div className="flex-shrink-0">
            {formation.logo_url ? (
              <img src={formation.logo_url} alt={formation.etablissement}
                className="w-20 h-20 object-contain rounded-2xl border border-gray-100"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
            ) : null}
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 text-white rounded-2xl flex items-center justify-center font-bold text-3xl"
              style={{ display: formation.logo_url ? 'none' : 'flex' }}>
              {formation.etablissement?.[0]}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${niveauColors[formation.niveau] || 'bg-gray-100 text-gray-600'}`}>{formation.niveau}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${formation.type === 'public' ? 'bg-green-100 text-green-700' : 'bg-pink-100 text-pink-700'}`}>
                {formation.type === 'public' ? 'Public' : 'Privé'}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{formation.nom}</h1>
            <p className="text-gray-500 mt-1">{formation.etablissement}</p>
            <p className="text-gray-400 text-sm">{formation.ville}</p>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
          {[
            { label: 'Durée', value: `${formation.duree_annees} an(s)` },
            { label: 'Frais/an', value: formation.frais_scolarite ? `${Number(formation.frais_scolarite).toLocaleString()} FCFA` : 'Gratuit' },
            { label: 'Intéressés', value: formation.interets_count || 0 },
          ].map(({ label, value }) => (
            <div key={label} className="text-center bg-gray-50 rounded-xl p-3">
              <p className="text-lg font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Bouton intérêt */}
        {formation.site_web && (
          <a href={formation.site_web} target="_blank" rel="noopener noreferrer"
            className="mt-4 w-full py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 bg-white border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50">
            🌐 Visiter le site officiel de {formation.etablissement}
          </a>
        )}
        <button onClick={() => toggleInteret.mutate()}
          className={`mt-4 w-full py-3 rounded-xl font-semibold text-sm transition ${
            formation.je_suis_interesse
              ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-indigo-200'
          }`}>
          {formation.je_suis_interesse ? '✓ Je suis intéressé(e) — Retirer' : 'Je suis intéressé(e) par cette formation'}
        </button>
      </div>

      {/* Description */}
      {formation.description && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{formation.description}</p>
        </div>
      )}

      {/* Infos détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formation.debouches && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-5">
            <h2 className="font-semibold text-emerald-800 mb-3">Débouchés professionnels</h2>
            <div className="flex flex-wrap gap-2">
              {formation.debouches.split(',').map(d => (
                <span key={d} className="bg-white text-emerald-700 text-xs px-3 py-1 rounded-full border border-emerald-200 font-medium">
                  {d.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {formation.conditions_acces && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5">
            <h2 className="font-semibold text-blue-800 mb-3">Conditions d'accès</h2>
            <div className="flex flex-wrap gap-2">
              {formation.conditions_acces.split(',').map(c => (
                <span key={c} className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 font-medium">
                  {c.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {formation.domaine && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-3">Domaine</h2>
          <div className="flex flex-wrap gap-2">
            {formation.domaine.split(' ').map(d => (
              <span key={d} className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">{d}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
