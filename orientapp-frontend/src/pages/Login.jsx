import { useState } from 'react'
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
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen flex relative overflow-hidden">

      {/* Image de fond pleine page */}
      <img
        src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1920&auto=format&fit=crop&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/95 via-purple-950/90 to-indigo-900/95" />

      {/* Cercles décoratifs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] bg-pink-500/10 rounded-full blur-2xl" />

      {/* Contenu */}
      <div className="relative z-10 flex w-full min-h-screen">

        {/* Gauche — Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/10 backdrop-blur border border-white/20 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              O
            </div>
            <span className="text-white text-xl font-bold tracking-tight">OrientApp</span>
          </div>

          {/* Texte central */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-sm">Plateforme d'orientation académique</span>
              </div>
              <h1 className="text-5xl font-bold text-white leading-tight">
                Construis ton<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300">
                  avenir académique
                </span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                Découvre les formations qui correspondent à ton profil et reçois des recommandations personnalisées.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              {[
                { value: '35+', label: 'Formations', icon: '🎓' },
                { value: '15+', label: 'Universités', icon: '🏛️' },
                { value: '100%', label: 'Gratuit', icon: '✨' },
              ].map(({ value, label, icon }) => (
                <div key={label} className="flex-1 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition">
                  <div className="text-2xl mb-1">{icon}</div>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Témoignage */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
              <p className="text-white/70 text-sm italic leading-relaxed">
                "OrientApp m'a aidé à trouver la formation parfaite. Les recommandations sont vraiment personnalisées !"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
                <div>
                  <p className="text-white text-sm font-medium">Aminata D.</p>
                  <p className="text-white/40 text-xs">Étudiante en Licence Informatique</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/30 text-sm">© 2025 OrientApp — Groupe 3</p>
        </div>

        {/* Droite — Formulaire */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16">
          <div className="w-full max-w-md">

            {/* Card formulaire */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

              {/* Mobile logo */}
              <div className="flex items-center gap-3 mb-8 lg:hidden">
                <div className="w-9 h-9 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white font-bold">O</div>
                <span className="text-xl font-bold text-white">OrientApp</span>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Connexion</h2>
                <p className="text-white/50 mt-2 text-sm">Bienvenue ! Connectez-vous à votre compte.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Adresse email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">✉</span>
                    <input {...register('email')} type="email" placeholder="exemple@email.com"
                      className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition ${errors.email ? 'border-red-400/50' : 'border-white/10'}`} />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Mot de passe</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔒</span>
                    <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                      className={`w-full bg-white/5 border rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition ${errors.password ? 'border-red-400/50' : 'border-white/10'}`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition text-xs">
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
                </div>

                {/* Erreur globale */}
                {errors.root && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
                    ⚠️ {errors.root.message}
                  </div>
                )}

                {/* Bouton */}
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3.5 rounded-xl font-semibold transition shadow-lg shadow-indigo-500/25 text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connexion...
                    </>
                  ) : 'Se connecter →'}
                </button>
              </form>

              {/* Lien inscription */}
              <div className="mt-6 text-center">
                <p className="text-sm text-white/40">
                  Pas encore de compte ?{' '}
                  <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition">
                    S'inscrire gratuitement
                  </Link>
                </p>
              </div>

              {/* Séparateur */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/30 text-xs">Comptes de démo</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Comptes démo */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { role: 'Admin', email: 'admin@orientapp.com', color: 'from-red-500/20 to-orange-500/20 border-red-500/20 text-red-300' },
                  { role: 'Conseiller', email: 'conseiller@test.com', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/20 text-emerald-300' },
                  { role: 'Étudiant', email: 'etudiant@test.com', color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/20 text-blue-300' },
                ].map(({ role, email, color }) => (
                  <div key={role} className={`bg-gradient-to-br ${color} border rounded-xl p-3 text-center`}>
                    <p className="text-xs font-semibold mb-1">{role}</p>
                    <p className="text-xs opacity-60 truncate">{email}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-white/30 text-xs mt-2">Mot de passe : <span className="font-mono">Admin@1234</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
