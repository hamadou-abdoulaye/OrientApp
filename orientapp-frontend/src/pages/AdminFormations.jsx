import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from '../api/axios'

const niveaux = ['Licence', 'Master', 'BTS', 'DUT', 'Doctorat', 'Autre']

export default function AdminFormations() {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['formations-admin'],
    queryFn: () => api.get('/formations').then(r => r.data),
  })

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm()

  const save = useMutation({
    mutationFn: (data) => editing
      ? api.put(`/formations/${editing}`, data)
      : api.post('/formations', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['formations-admin'])
      queryClient.invalidateQueries(['formations'])
      reset()
      setEditing(null)
      setShowForm(false)
    },
  })

  const remove = useMutation({
    mutationFn: (id) => api.delete(`/formations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['formations-admin'])
      queryClient.invalidateQueries(['formations'])
    },
  })

  const handleEdit = (f) => {
    setEditing(f.id)
    setShowForm(true)
    Object.keys(f).forEach(k => setValue(k, f[k]))
  }

  const handleNew = () => {
    setEditing(null)
    reset()
    setShowForm(true)
  }

  const fields = [
    { name: 'nom', label: 'Nom', required: true },
    { name: 'domaine', label: 'Domaine', required: true },
    { name: 'etablissement', label: 'Établissement', required: true },
    { name: 'ville', label: 'Ville', required: true },
    { name: 'duree_annees', label: 'Durée (années)', type: 'number', required: true },
    { name: 'frais_scolarite', label: 'Frais scolarité (FCFA/an)', type: 'number' },
    { name: 'description', label: 'Description', textarea: true },
    { name: 'debouches', label: 'Débouchés', textarea: true },
    { name: 'conditions_acces', label: "Conditions d'accès", textarea: true },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des formations</h1>
        <button onClick={handleNew} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
          + Nouvelle formation
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">{editing ? 'Modifier' : 'Nouvelle formation'}</h2>
          <form onSubmit={handleSubmit(d => save.mutate(d))} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ name, label, type, required, textarea }) => (
              <div key={name} className={textarea ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                {textarea ? (
                  <textarea {...register(name)} rows={2}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                ) : (
                  <input {...register(name, { required })} type={type || 'text'}
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
              <button type="submit" disabled={isSubmitting}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 text-sm">
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
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {['Nom', 'Établissement', 'Ville', 'Niveau', 'Frais', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.data?.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{f.nom}</td>
                  <td className="px-4 py-3 text-gray-500">{f.etablissement}</td>
                  <td className="px-4 py-3 text-gray-500">{f.ville}</td>
                  <td className="px-4 py-3">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">{f.niveau}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{f.frais_scolarite ? `${Number(f.frais_scolarite).toLocaleString()} FCFA` : 'Gratuit'}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(f)} className="text-indigo-600 hover:underline text-xs">Modifier</button>
                    <button onClick={() => { if (confirm('Supprimer ?')) remove.mutate(f.id) }}
                      className="text-red-500 hover:underline text-xs">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
