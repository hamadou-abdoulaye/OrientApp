import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
  password_confirmation: z.string(),
  role: z.enum(['etudiant']),
}).refine((d) => d.password === d.password_confirmation, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['password_confirmation'],
})

const roles = [
  { value: 'etudiant', label: 'Étudiant', desc: 'Je cherche une orientation', color: 'border-indigo-300 bg-indigo-50 text-indigo-700' },
]

export default function Register() {
  const { register: registerUser } = useAuthStore()
  const navigate = useNavigate()
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: 'etudiant' },
  })

  const selectedRole = watch('role')

  const onSubmit = async (data) => {
    try {
      const user = await registerUser(data)
      navigate(user.role === 'conseiller' ? '/conseiller' : '/dashboard')
    } catch (err) {
      setError('root', { message: err.response?.data?.message || 'Erreur lors de l\'inscription' })
    }
  }

  const fields = [
    { name: 'name', label: 'Nom complet', type: 'text', placeholder: 'Votre nom complet' },
    { name: 'email', label: 'Adresse email', type: 'email', placeholder: 'exemple@email.com' },
    { name: 'password', label: 'Mot de passe', type: 'password', placeholder: '••••••••' },
    { name: 'password_confirmation', label: 'Confirmer le mot de passe', type: 'password', placeholder: '••••••••' },
  ]

  return (
    <div className="min-h-screen flex">

      {/* Left — Illustration */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop&q=80" alt="étudiants" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/90 via-teal-700/80 to-cyan-600/80" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-5 rounded-full" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-white opacity-5 rounded-full" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-white font-bold text-lg">O</div>
            <span className="text-white text-xl font-bold">OrientApp</span>
          </div>
        </div>
        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Rejoins la<br />communauté
          </h1>
          <p className="text-emerald-100 text-lg leading-relaxed">
            Crée ton compte et accède à des recommandations personnalisées pour choisir ta filière idéale.
          </p>
          <div className="space-y-3">
            {[
              { text: 'Questionnaire d\'orientation personnalisé' },
              { text: 'Recommandations basées sur ton profil' },
              { text: 'Conseils d\'experts en orientation' },
            ].map(({ text }) => (
              <div key={text} className="flex items-center gap-3 text-emerald-100 text-sm">
                <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <p className="text-emerald-300 text-sm">© 2025 OrientApp — Groupe 3</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-y-auto">
        <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
        <div className="w-full max-w-md py-8 relative z-10">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold">O</div>
            <span className="text-xl font-bold text-gray-800">OrientApp</span>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Créer un compte</h2>
            <p className="text-gray-400 mt-2">Rejoignez OrientApp gratuitement.</p>
          </div>

          {/* Sélection rôle masquée — étudiant par défaut */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                <input {...register(name)} type={type} placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white transition" />
                {errors[name] && <p className="text-red-500 text-xs mt-1.5">{errors[name].message}</p>}
              </div>
            ))}

            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                {errors.root.message}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-emerald-200 text-sm mt-2">
              {isSubmitting ? 'Inscription...' : 'Créer mon compte'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-emerald-600 font-semibold hover:underline">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
