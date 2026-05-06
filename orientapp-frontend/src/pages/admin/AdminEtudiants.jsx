import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../api/axios'

export default function AdminEtudiants() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-etudiants'],
    queryFn: () => api.get('/admin/users?role=etudiant').then(r => r.data),
  })

  const remove = useMutation({
    mutationFn: (id) => api.delete(`/admin/users/${id}`),
    onSuccess: () => { queryClient.invalidateQueries(['admin-etudiants']); queryClient.invalidateQueries(['admin-stats']) },
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Étudiants</h1>
        <p className="text-gray-500 text-sm mt-1">{data?.length || 0} étudiant(s) inscrit(s)</p>
      </div>

      {isLoading ? <p className="text-gray-500">Chargement...</p> : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {['Nom', 'Email', 'Ville', 'Série Bac', 'Moyenne', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {e.name[0].toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800">{e.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{e.email}</td>
                  <td className="px-4 py-3 text-gray-500">{e.ville || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{e.serie_bac || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{e.moyenne_bac ? `${e.moyenne_bac}/20` : '—'}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => { if (confirm('Supprimer cet étudiant ?')) remove.mutate(e.id) }}
                      className="text-red-400 hover:text-red-600 text-xs">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data?.length === 0 && <p className="text-gray-400 text-sm p-4">Aucun étudiant inscrit.</p>}
        </div>
      )}
    </div>
  )
}
