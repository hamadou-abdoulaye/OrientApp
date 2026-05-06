import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from '../../api/axios'

export default function AdminConseillers() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-conseillers'],
    queryFn: () => api.get('/admin/users?role=conseiller').then(r => r.data),
  })

  const create = useMutation({
    mutationFn: (d) => api.post('/admin/users', { ...d, role: 'conseiller' }),
    onSuccess: () => { queryClient.invalidateQueries(['admin-conseillers']); queryClient.invalidateQueries(['admin-stats']); reset(); setShowForm(false) },
  })

  const remove = useMutation({
    mutationFn: (id) => api.delete(`/admin/users/${id}`),
    onSuccess: () => { queryClient.invalidateQueries(['admin-conseillers']); queryClient.invalidateQueries(['admin-stats']) },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Conseillers</h1>
          <p className="text-gray-500 text-sm mt-1">{data?.length || 0} conseiller(s) enregistré(s)</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
          + Nouveau conseiller
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Ajouter un conseiller</h2>
          <form onSubmit={handleSubmit(d => create.mutate(d))} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input {...register('name', { required: true })} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input {...register('email', { required: true })} type="email" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input {...register('password', { required: true, minLength: 6 })} type="password" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div className="md:col-span-3 flex gap-3">
              <button type="submit" disabled={isSubmitting}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                {isSubmitting ? 'Enregistrement...' : 'Ajouter'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); reset() }}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 text-sm">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? <p className="text-gray-500">Chargement...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl shadow p-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {c.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{c.name}</p>
                  <p className="text-gray-400 text-xs">{c.email}</p>
                </div>
              </div>
              <button onClick={() => { if (confirm('Supprimer ce conseiller ?')) remove.mutate(c.id) }}
                className="text-red-400 hover:text-red-600 text-xs">Supprimer</button>
            </div>
          ))}
          {data?.length === 0 && <p className="text-gray-400 text-sm col-span-3">Aucun conseiller enregistré.</p>}
        </div>
      )}
    </div>
  )
}
