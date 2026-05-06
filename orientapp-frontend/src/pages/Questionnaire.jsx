import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const schema = z.object({
  serie_bac: z.string().min(1, 'Requis'),
  moyenne_generale: z.coerce.number().min(0).max(20),
  ville_souhaitee: z.string().optional(),
  budget_mensuel: z.coerce.number().optional(),
  matieres_preferees: z.string().min(1, 'Requis'),
  centres_interet: z.string().min(1, 'Requis'),
  aspirations_professionnelles: z.string().optional(),
})

const steps = [
  {
    title: 'Parcours scolaire',
    icon: '📚',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-purple-50 border-purple-100',
    ring: 'focus:ring-purple-400',
    fields: [
      { name: 'serie_bac', label: 'Série du Bac', type: 'text', placeholder: 'ex: S, L, ES, T...' },
      { name: 'moyenne_generale', label: 'Moyenne générale (/20)', type: 'number', placeholder: 'ex: 14.5' },
      { name: 'matieres_preferees', label: 'Matières préférées (séparées par virgule)', type: 'text', placeholder: 'ex: Maths, Physique, Informatique' },
    ]
  },
  {
    title: 'Préférences & Ambitions',
    icon: '🎯',
    color: 'from-orange-400 to-pink-500',
    bg: 'bg-orange-50 border-orange-100',
    ring: 'focus:ring-orange-400',
    fields: [
      { name: 'centres_interet', label: "Centres d'intérêt (séparés par virgule)", type: 'text', placeholder: 'ex: Technologie, Santé, Commerce' },
      { name: 'aspirations_professionnelles', label: 'Aspirations professionnelles (optionnel)', type: 'text', placeholder: 'ex: Ingénieur, Médecin, Entrepreneur' },
    ]
  },
  {
    title: 'Contraintes pratiques',
    icon: '📍',
    color: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-50 border-cyan-100',
    ring: 'focus:ring-cyan-400',
    fields: [
      { name: 'ville_souhaitee', label: 'Ville souhaitée', type: 'text', placeholder: 'ex: Dakar, Thiès, Saint-Louis' },
      { name: 'budget_mensuel', label: 'Budget mensuel (FCFA)', type: 'number', placeholder: 'ex: 150000' },
    ]
  },
]

export default function Questionnaire() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    await api.post('/questionnaire', {
      ...data,
      matieres_preferees: data.matieres_preferees.split(',').map(s => s.trim()),
      centres_interet: data.centres_interet.split(',').map(s => s.trim()),
      aspirations_professionnelles: data.aspirations_professionnelles
        ? data.aspirations_professionnelles.split(',').map(s => s.trim()) : [],
    })
    navigate('/recommandations')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">📋 Questionnaire d'orientation</h1>
        <p className="text-purple-100 text-sm mt-1">Remplissez ce formulaire pour obtenir des recommandations personnalisées.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {steps.map(({ title, icon, color, bg, ring, fields }) => (
          <div key={title} className={`rounded-2xl border p-6 ${bg}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-xl`}>
                {icon}
              </div>
              <h2 className="font-semibold text-gray-800">{title}</h2>
            </div>
            <div className="space-y-4">
              {fields.map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input {...register(name)} type={type} placeholder={placeholder}
                    className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${ring} bg-white`} />
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button type="submit" disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-2xl font-semibold transition text-sm shadow-lg shadow-indigo-200">
          {isSubmitting ? '⏳ Analyse en cours...' : '🚀 Obtenir mes recommandations'}
        </button>
      </form>
    </div>
  )
}
