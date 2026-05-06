import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'
import useAuthStore from '../store/authStore'
import ImageUpload from '../components/ImageUpload'

export default function Profil() {
  const [tab, setTab] = useState('infos')
  const queryClient = useQueryClient()
  const { fetchMe } = useAuthStore()

  const { data: profil } = useQuery({
    queryKey: ['profil'],
    queryFn: () => api.get('/profil').then(r => r.data),
  })

  const { register, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm()
  const { register: regPwd, handleSubmit: handlePwd, reset: resetPwd, formState: { isSubmitting: isPwdSubmitting }, setError: setPwdError, formState: pwdForm } = useForm()

  useEffect(() => {
    if (profil) reset(profil)
  }, [profil])

  const updateProfil = useMutation({
    mutationFn: (d) => api.put('/profil', d),
    onSuccess: () => { queryClient.invalidateQueries(['profil']); fetchMe() },
  })

  const updatePassword = useMutation({
    mutationFn: (d) => api.put('/profil/password', d),
    onSuccess: () => resetPwd(),
    onError: (err) => setPwdError('current_password', { message: err.response?.data?.message }),
  })

  const fields = [
    { name: 'name', label: 'Nom complet', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'telephone', label: 'Téléphone', type: 'text' },
    { name: 'ville', label: 'Ville de résidence', type: 'text' },
    { name: 'serie_bac', label: 'Série du Bac', type: 'text' },
    { name: 'moyenne_bac', label: 'Moyenne au Bac (/20)', type: 'number' },
    { name: 'budget_mensuel', label: 'Budget mensuel (FCFA)', type: 'number' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ImageUpload
              url={profil?.avatar ? `http://127.0.0.1:8000/storage/${profil.avatar}` : null}
              shape="rounded-full"
              size="w-20 h-20"
              placeholder="👤"
              fieldName="avatar"
              onSuccess={{
                uploadUrl: '/upload/avatar',
                callback: (data) => {
                  queryClient.invalidateQueries(['profil'])
                  fetchMe()
                }
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profil?.name}</h1>
            <p className="text-indigo-200 text-sm">{profil?.email}</p>
            <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full mt-1 inline-block capitalize">{profil?.role}</span>
            <p className="text-indigo-200 text-xs mt-1">Cliquez sur la photo pour la modifier</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'infos', label: 'Mes informations' },
          { key: 'password', label: 'Mot de passe' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${tab === t.key ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'infos' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-5">Informations personnelles</h2>
          <form onSubmit={handleSubmit(d => updateProfil.mutate(d))} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ name, label, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input {...register(name)} type={type}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50" />
              </div>
            ))}
            <div className="md:col-span-2">
              <button type="submit" disabled={isSubmitting || !isDirty}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 transition hover:opacity-90">
                {isSubmitting ? 'Enregistrement...' : 'Sauvegarder les modifications'}
              </button>
              {updateProfil.isSuccess && <span className="ml-3 text-green-600 text-sm">Profil mis à jour ✓</span>}
            </div>
          </form>
        </div>
      )}

      {tab === 'password' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-5">Changer le mot de passe</h2>
          <form onSubmit={handlePwd(d => updatePassword.mutate(d))} className="space-y-4 max-w-sm">
            {[
              { name: 'current_password', label: 'Mot de passe actuel' },
              { name: 'password', label: 'Nouveau mot de passe' },
              { name: 'password_confirmation', label: 'Confirmer le nouveau mot de passe' },
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input {...regPwd(name, { required: true })} type="password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50" />
                {pwdForm.errors?.[name] && <p className="text-red-500 text-xs mt-1">{pwdForm.errors[name].message}</p>}
              </div>
            ))}
            <button type="submit" disabled={isPwdSubmitting}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition hover:opacity-90">
              {isPwdSubmitting ? 'Mise à jour...' : 'Changer le mot de passe'}
            </button>
            {updatePassword.isSuccess && <p className="text-green-600 text-sm">Mot de passe mis à jour ✓</p>}
          </form>
        </div>
      )}
    </div>
  )
}
