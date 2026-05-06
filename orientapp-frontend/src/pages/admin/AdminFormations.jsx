import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from '../../api/axios'
import ImageUpload from '../../components/ImageUpload'

const niveaux = ['Licence', 'Master', 'BTS', 'DUT', 'Doctorat', 'Autre']

const LogoPlaceholder = ({ nom }) => (
  <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-lg">
    {nom?.[0]?.toUpperCase()}
  </div>
)

export default function AdminFormationsPage() {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['formations-admin'],
    queryFn: () => api.get('/formations').then(r => r.data),
  })

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm()

  const save = useMutation({
    mutationFn: (d) => editing ? api.put(`/formations/${editing}`, d) : api.post('/formations', d),
    onSuccess: () => { queryClient.invalidateQueries(['formations-admin']); queryClient.invalidateQueries(['formations']); queryClient.invalidateQueries(['admin-stats']); reset(); setEditing(null); setShowForm(false) },
  })

  const remove = useMutation({
    mutationFn: (id) => api.delete(`/formations/${id}`),
    onSuccess: () => { queryClient.invalidateQueries(['formations-admin']); queryClient.invalidateQueries(['formations']); queryClient.invalidateQueries(['admin-stats']) },
  })

  const handleEdit = (f) => {
    setEditing(f.id)
    setShowForm(true)
    Object.keys(f).forEach(k => setValue(k, f[k]))
  }

  const fields = [
    { name: 'nom', label: 'Nom de la formation', required: true },
    { name: 'domaine', label: 'Domaine', required: true },
    { name: 'etablissement', label: 'Établissement', required: true },
    { name: 'ville', label: 'Ville', required: true },
    { name: 'duree_annees', label: 'Durée (années)', type: 'number', required: true },
    { name: 'frais_scolarite', label: 'Frais scolarité (FCFA/an)', type: 'number' },
    { name: 'logo_url', label: 'URL du logo', placeholder: 'https://...' },
    { name: 'description', label: 'Description', textarea: true },
    { name: 'debouches', label: 'Débouchés', textarea: true },
    { name: 'conditions_acces', label: "Conditions d'accès", textarea: true },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Formations</h1>
          <p className="text-gray-500 text-sm mt-1">{data?.data?.length || 0} formation(s) disponible(s)</p>
        </div>
        <button onClick={() => { setEditing(null); reset(); setShowForm(!showForm) }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
          + Nouvelle formation
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">{editing ? 'Modifier la formation' : 'Nouvelle formation'}</h2>
          <form onSubmit={handleSubmit(d => save.mutate(d))} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ name, label, type, required, textarea, placeholder }) => (
              <div key={name} className={textarea ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                {textarea ? (
                  <textarea {...register(name)} rows={2} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                ) : (
                  <input {...register(name, { required })} type={type || 'text'} placeholder={placeholder}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                )}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
              <select {...register('niveau')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                {niveaux.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); reset() }}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 text-sm">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? <p className="text-gray-500">Chargement...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data?.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl shadow p-5 flex gap-4">
              <div className="flex-shrink-0">
                <ImageUpload
                  url={f.logo_url || null}
                  shape="rounded-xl"
                  size="w-14 h-14"
                  placeholder="🎓"
                  fieldName="logo"
                  onSuccess={{
                    uploadUrl: `/upload/formation/${f.id}/logo`,
                    callback: () => {
                      queryClient.invalidateQueries(['formations-admin'])
                      queryClient.invalidateQueries(['formations'])
                    }
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h2 className="font-semibold text-gray-800 text-sm truncate">{f.nom}</h2>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">{f.niveau}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{f.etablissement} — {f.ville}</p>
                <p className="text-xs text-gray-400 mt-1">{f.duree_annees} an(s) · {f.frais_scolarite ? `${Number(f.frais_scolarite).toLocaleString()} FCFA/an` : 'Gratuit'}</p>
                <div className="flex gap-3 mt-3">
                  <button onClick={() => handleEdit(f)} className="text-indigo-600 hover:underline text-xs">Modifier</button>
                  <button onClick={() => { if (confirm('Supprimer ?')) remove.mutate(f.id) }} className="text-red-500 hover:underline text-xs">Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
