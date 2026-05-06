import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../../api/axios'

export default function ConseillerFormations() {
  const [search, setSearch] = useState('')
  const [niveau, setNiveau] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['formations', search, niveau],
    queryFn: () => api.get('/formations', { params: { search, niveau } }).then(r => r.data),
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Catalogue des formations</h1>
        <p className="text-gray-500 text-sm mt-1">Consultez les formations disponibles pour orienter vos étudiants.</p>
      </div>

      <div className="flex gap-4">
        <input type="text" placeholder="Rechercher une formation..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white" />
        <select value={niveau} onChange={(e) => setNiveau(e.target.value)}
          className="border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
          <option value="">Tous les niveaux</option>
          {['Licence', 'Master', 'BTS', 'DUT', 'Doctorat', 'Autre'].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {isLoading ? <p className="text-gray-500">Chargement...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data?.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 hover:shadow-md transition">
              <div className="flex-shrink-0">
                {f.logo_url ? (
                  <img src={f.logo_url} alt={f.etablissement}
                    className="w-14 h-14 object-contain rounded-xl border border-gray-100"
                    onError={(e) => { e.target.style.display = 'none' }} />
                ) : (
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold text-xl">
                    {f.etablissement?.[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h2 className="font-semibold text-gray-800 text-sm truncate">{f.nom}</h2>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">{f.niveau}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{f.etablissement} — {f.ville}</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{f.description}</p>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>⏱ {f.duree_annees} an(s)</span>
                  <span>💰 {f.frais_scolarite ? `${Number(f.frais_scolarite).toLocaleString()} FCFA/an` : 'Gratuit'}</span>
                </div>
                {f.debouches && (
                  <p className="text-xs text-emerald-600 mt-1.5">🎯 {f.debouches}</p>
                )}
              </div>
            </div>
          ))}
          {data?.data?.length === 0 && <p className="text-gray-400 text-sm col-span-2">Aucune formation trouvée.</p>}
        </div>
      )}
    </div>
  )
}
