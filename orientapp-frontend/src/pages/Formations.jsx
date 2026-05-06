import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../api/axios'

const niveauColors = {
  Licence: 'bg-blue-100 text-blue-700',
  Master: 'bg-purple-100 text-purple-700',
  BTS: 'bg-orange-100 text-orange-700',
  DUT: 'bg-cyan-100 text-cyan-700',
  Doctorat: 'bg-red-100 text-red-700',
  Autre: 'bg-gray-100 text-gray-600',
}

export default function Formations() {
  const [search, setSearch] = useState('')
  const [niveau, setNiveau] = useState('')
  const [ville, setVille] = useState('')
  const [type, setType] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['formations', search, niveau, ville, type],
    queryFn: () => api.get('/formations', { params: { search, niveau, ville, type } }).then(r => r.data),
  })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Catalogue des formations</h1>
        <p className="text-cyan-100 text-sm mt-1">Explorez toutes les formations disponibles au Sénégal.</p>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <input type="text" placeholder="Rechercher..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="col-span-2 md:col-span-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white shadow-sm" />
        <select value={niveau} onChange={(e) => setNiveau(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white shadow-sm">
          <option value="">Tous les niveaux</option>
          {['Licence', 'Master', 'BTS', 'DUT', 'Doctorat', 'Autre'].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <select value={ville} onChange={(e) => setVille(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white shadow-sm">
          <option value="">Toutes les villes</option>
          {['Dakar', 'Saint-Louis', 'Thiès', 'Ziguinchor', 'Bambey'].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white shadow-sm">
          <option value="">Public & Privé</option>
          <option value="public">Public</option>
          <option value="prive">Privé</option>
        </select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 animate-pulse h-32 shadow-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data?.map((f) => (
            <Link to={`/formations/${f.id}`} key={f.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex-shrink-0">
                {f.logo_url ? (
                  <img src={f.logo_url} alt={f.etablissement}
                    className="w-14 h-14 object-contain rounded-xl border border-gray-100"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                ) : null}
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-xl flex items-center justify-center font-bold text-xl"
                  style={{ display: f.logo_url ? 'none' : 'flex' }}>
                  {f.etablissement?.[0]}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="font-semibold text-gray-800 text-sm">{f.nom}</h2>
                  <div className="flex gap-1 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${niveauColors[f.niveau] || 'bg-gray-100 text-gray-600'}`}>{f.niveau}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.type === 'public' ? 'bg-green-100 text-green-700' : 'bg-pink-100 text-pink-700'}`}>
                      {f.type === 'public' ? 'Public' : 'Privé'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{f.etablissement} — {f.ville}</p>
                <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{f.description}</p>
                <div className="flex justify-between mt-2.5 text-xs">
                  <span className="text-gray-400">{f.duree_annees} an(s)</span>
                  <span className="font-semibold text-cyan-600">{f.frais_scolarite ? `${Number(f.frais_scolarite).toLocaleString()} FCFA/an` : 'Gratuit'}</span>
                </div>
                {f.debouches && (
                  <p className="text-xs text-emerald-600 mt-1.5 line-clamp-1 font-medium">{f.debouches}</p>
                )}
              </div>
            </Link>
          ))}
          {data?.data?.length === 0 && (
            <div className="col-span-2 bg-white rounded-2xl p-12 text-center shadow-sm">
              <p className="text-gray-400 text-sm">Aucune formation trouvée.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
