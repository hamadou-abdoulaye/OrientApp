import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from '../../api/axios'

const niveaux = ['Licence', 'Master', 'BTS', 'DUT', 'Doctorat', 'Autre']
const types = ['public', 'prive']

const getFaviconUrl = (etablissement) => {
  const domains = {
    'université': null,
    'ust': 'https://www.ust.sn/favicon.ico',
    'ucad': 'https://www.ucad.sn/favicon.ico',
    'esp': 'https://www.esp.sn/favicon.ico',
    'iut': null,
    'isep': 'https://www.isep.sn/favicon.ico',
    'sup': null,
  }
  const key = Object.keys(domains).find(k => etablissement?.toLowerCase().includes(k))
  return key ? domains[key] : null
}

const LogoAuto = ({ etablissement, logoUrl, size = 'w-10 h-10' }) => {
  const [imgError, setImgError] = useState(false)
  const favicon = getFaviconUrl(etablissement)
  const src = logoUrl || favicon

  if (src && !imgError) {
    return <img src={src} alt={etablissement} onError={() => setImgError(true)}
      className={`${size} rounded-xl object-contain bg-white border border-gray-100 p-1`} />
  }
  return (
    <div className={`${size} bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
      {etablissement?.[0]?.toUpperCase()}
    </div>
  )
}

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
        {children}
      </div>
    </div>
  )
}

export default function AdminFormationsPage() {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [filterNiveau, setFilterNiveau] = useState('')
  const [filterType, setFilterType] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['formations-admin'],
    queryFn: () => api.get('/formations?per_page=100').then(r => r.data),
  })

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting, errors } } = useForm()

  const save = useMutation({
    mutationFn: (d) => editing ? api.put(`/formations/${editing}`, d) : api.post('/formations', d),
    onSuccess: () => {
      queryClient.invalidateQueries(['formations-admin'])
      queryClient.invalidateQueries(['formations'])
      reset(); setEditing(null); setShowModal(false)
    },
  })

  const remove = useMutation({
    mutationFn: (id) => api.delete(`/formations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['formations-admin'])
      queryClient.invalidateQueries(['formations'])
      setDeleteConfirm(null)
    },
  })

  const handleEdit = (f) => {
    setEditing(f.id)
    Object.keys(f).forEach(k => setValue(k, f[k]))
    setShowModal(true)
  }

  const handleNew = () => {
    setEditing(null)
    reset()
    setShowModal(true)
  }

  const formations = data?.data || []
  const filtered = formations.filter(f => {
    const matchSearch = !search || f.nom?.toLowerCase().includes(search.toLowerCase()) ||
      f.etablissement?.toLowerCase().includes(search.toLowerCase()) ||
      f.ville?.toLowerCase().includes(search.toLowerCase())
    const matchNiveau = !filterNiveau || f.niveau === filterNiveau
    const matchType = !filterType || f.type === filterType
    return matchSearch && matchNiveau && matchType
  })

  const fields = [
    { name: 'nom', label: 'Nom de la formation', required: true, col: 2 },
    { name: 'etablissement', label: 'Établissement', required: true },
    { name: 'ville', label: 'Ville', required: true },
    { name: 'domaine', label: 'Domaine', required: true },
    { name: 'duree_annees', label: 'Durée (années)', type: 'number', required: true },
    { name: 'frais_scolarite', label: 'Frais scolarité (FCFA/an)', type: 'number' },
    { name: 'logo_url', label: 'URL du logo', placeholder: 'https://université.com/logo.png', col: 2 },
    { name: 'site_web', label: 'Site officiel', placeholder: 'https://université.com', col: 2 },
    { name: 'description', label: 'Description', textarea: true, col: 2 },
    { name: 'debouches', label: 'Débouchés', textarea: true, col: 2 },
    { name: 'conditions_acces', label: "Conditions d'accès", textarea: true, col: 2 },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Formations</h1>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} / {formations.length} formation(s)</p>
        </div>
        <button onClick={handleNew}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition text-sm font-medium shadow-lg shadow-indigo-200">
          <span className="text-lg">+</span> Nouvelle formation
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom, établissement, ville..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50" />
        </div>
        <select value={filterNiveau} onChange={e => setFilterNiveau(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50">
          <option value="">Tous les niveaux</option>
          {niveaux.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50">
          <option value="">Tous les types</option>
          <option value="public">Public</option>
          <option value="prive">Privé</option>
        </select>
        {(search || filterNiveau || filterType) && (
          <button onClick={() => { setSearch(''); setFilterNiveau(''); setFilterType('') }}
            className="text-sm text-gray-400 hover:text-gray-600 px-2">✕ Réinitialiser</button>
        )}
      </div>

      {/* Tableau */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-4xl mb-3">🎓</p>
          <p className="text-gray-500">Aucune formation trouvée</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Formation</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Domaine</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Niveau</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Frais</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <LogoAuto etablissement={f.etablissement} logoUrl={f.logo_url} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[180px]">{f.nom}</p>
                        <p className="text-xs text-gray-400 truncate">{f.etablissement} · {f.ville}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">{f.domaine}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-medium">{f.niveau}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${f.type === 'public' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                      {f.type === 'public' ? 'Public' : 'Privé'}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-sm text-gray-600">
                    {f.frais_scolarite ? `${Number(f.frais_scolarite).toLocaleString()} FCFA` : <span className="text-green-600 font-medium">Gratuit</span>}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(f)}
                        className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition font-medium">
                        ✏️ Modifier
                      </button>
                      <button onClick={() => setDeleteConfirm(f)}
                        className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg transition font-medium">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Formulaire */}
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditing(null); reset() }}>
        <div className="p-6">
          {/* Header modal */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {editing ? '✏️ Modifier la formation' : '🎓 Nouvelle formation'}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                {editing ? 'Modifiez les informations de la formation' : 'Remplissez les informations de la nouvelle formation'}
              </p>
            </div>
            <button onClick={() => { setShowModal(false); setEditing(null); reset() }}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(d => save.mutate(d))} className="space-y-5">

            {/* Infos principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(({ name, label, type, required, textarea, placeholder, col }) => (
                <div key={name} className={col === 2 ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
                  {textarea ? (
                    <textarea {...register(name)} rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 resize-none" />
                  ) : (
                    <input {...register(name, { required: required ? `${label} est requis` : false })}
                      type={type || 'text'} placeholder={placeholder}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 ${errors[name] ? 'border-red-400' : 'border-gray-200'}`} />
                  )}
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
                </div>
              ))}

              {/* Niveau */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Niveau</label>
                <select {...register('niveau')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50">
                  {niveaux.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                <select {...register('type')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50">
                  <option value="public">Public</option>
                  <option value="prive">Privé</option>
                </select>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button type="submit" disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition disabled:opacity-50">
                {isSubmitting ? 'Enregistrement...' : editing ? 'Mettre à jour' : 'Créer la formation'}
              </button>
              <button type="button" onClick={() => { setShowModal(false); setEditing(null); reset() }}
                className="px-6 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-200 transition">
                Annuler
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal Confirmation Suppression */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🗑️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Supprimer la formation ?</h2>
          <p className="text-gray-500 text-sm mb-6">
            <span className="font-semibold text-gray-700">"{deleteConfirm?.nom}"</span> sera définitivement supprimée.
          </p>
          <div className="flex gap-3">
            <button onClick={() => remove.mutate(deleteConfirm.id)}
              className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-red-700 transition">
              Supprimer
            </button>
            <button onClick={() => setDeleteConfirm(null)}
              className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-200 transition">
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
