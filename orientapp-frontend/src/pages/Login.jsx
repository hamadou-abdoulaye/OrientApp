import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
})

export default function Login() {
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const user = await login(data)
      navigate(user.role === 'admin' ? '/admin' : user.role === 'conseiller' ? '/conseiller' : '/dashboard')
    } catch {
      setError('root', { message: 'Email ou mot de passe incorrect' })
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Left — Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white opacity-5 rounded-full" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-white font-bold text-lg">O</div>
            <span className="text-white text-xl font-bold">OrientApp</span>
          </div>
        </div>
        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Ton avenir<br />commence ici
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            Découvre les formations qui correspondent à ton profil et construis ton parcours académique avec confiance.
          </p>
          <div className="flex gap-4">
            {[
              { value: '10+', label: 'Formations' },
              { value: '3', label: 'Rôles' },
              { value: '100%', label: 'Gratuit' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white bg-opacity-10 rounded-2xl px-4 py-3 text-center">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-indigo-200 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <p className="text-indigo-300 text-sm">© 2025 OrientApp — Groupe 3</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">O</div>
            <span className="text-xl font-bold text-gray-800">OrientApp</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Connexion</h2>
            <p className="text-gray-400 mt-2">Bienvenue ! Connectez-vous à votre compte.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse email</label>
              <input {...register('email')} type="email" placeholder="exemple@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white transition" />
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
              <input {...register('password')} type="password" placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white transition" />
              {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm flex items-center gap-2">
                ⚠️ {errors.root.message}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-indigo-200 text-sm">
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-indigo-600 font-semibold hover:underline">S'inscrire gratuitement</Link>
            </p>
          </div>

          {/* Demo accounts */}
          <div className="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <p className="text-xs font-semibold text-indigo-700 mb-2">Comptes de démonstration</p>
            <div className="space-y-1 text-xs text-indigo-600">
              <p>Étudiant : <span className="font-mono">etudiant@test.com</span></p>
              <p>Conseiller : <span className="font-mono">conseiller@test.com</span></p>
              <p>Admin : <span className="font-mono">admin@orientapp.com</span></p>
              <p className="text-indigo-400 mt-1">Mot de passe : <span className="font-mono">admin123</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
