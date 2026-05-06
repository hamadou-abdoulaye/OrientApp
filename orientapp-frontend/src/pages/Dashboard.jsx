import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAuthStore from '../store/authStore'
import api from '../api/axios'

export default function Dashboard() {
  const { user, fetchMe } = useAuthStore()

  useEffect(() => { if (!user) fetchMe() }, [])

  const { data: conseils } = useQuery({
    queryKey: ['mes-conseils'],
    queryFn: () => api.get('/mes-conseils').then(r => r.data),
  })

  const { data: nonLus } = useQuery({
    queryKey: ['non-lus'],
    queryFn: () => api.get('/mes-conseils/non-lus').then(r => r.data),
  })

  const { data: recommandations } = useQuery({
    queryKey: ['recommandations'],
    queryFn: () => api.get('/recommandations').then(r => r.data),
  })

  const cards = [
    { title: 'Questionnaire', desc: 'Remplissez votre profil', link: '/questionnaire', from: 'from-violet-500', to: 'to-purple-600', icon: '📋', bg: 'bg-purple-50' },
    { title: 'Recommandations', desc: `${recommandations?.length || 0} formation(s) pour vous`, link: '/recommandations', from: 'from-orange-400', to: 'to-pink-500', icon: '⭐', bg: 'bg-orange-50' },
    { title: 'Formations', desc: 'Explorer le catalogue', link: '/formations', from: 'from-cyan-500', to: 'to-blue-600', icon: '🎓', bg: 'bg-cyan-50' },
    { title: 'Mes conseils', desc: `${nonLus?.count > 0 ? `${nonLus.count} nouveau(x)` : 'Voir tous'}`, link: '/mes-conseils', from: 'from-emerald-400', to: 'to-teal-600', icon: '💬', bg: 'bg-emerald-50' },
  ]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-gradient-to-br from-indigo-600/90 via-purple-600/70 to-pink-500/80 bg-cover bg-center rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-indigo-100 text-sm mb-1">{greeting} 👋</p>
          <h1 className="text-3xl md:text-4xl font-bold">{user?.name}</h1>
          <p className="text-indigo-100 mt-2 text-sm max-w-md">
            Bienvenue sur OrientApp — Découvrez les formations qui correspondent à votre profil et construisez votre avenir.
          </p>
          {nonLus?.count > 0 && (
            <Link to="/mes-conseils" className="mt-4 inline-flex items-center gap-2 bg-yellow-400/90 backdrop-blur-sm text-yellow-900 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-yellow-300 transition">
              🔔 {nonLus.count} nouveau(x) conseil(s) — Voir
            </Link>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.title} to={card.link}
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <div className={`w-12 h-12 bg-gradient-to-br ${card.from} ${card.to} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <h2 className="font-semibold text-gray-800 text-sm">{card.title}</h2>
            <p className="text-gray-400 text-xs mt-1">{card.desc}</p>
          </Link>
        ))}
      </div>

      {/* Dernières recommandations */}
      {recommandations?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">🎯 Mes meilleures recommandations</h2>
            <Link to="/recommandations" className="text-xs text-indigo-600 hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-3">
            {recommandations.slice(0, 3).map((rec) => {
              const score = rec.score_compatibilite
              const color = score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-400'
              const badge = score >= 70 ? 'bg-green-100 text-green-700' : score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'
              return (
                <div key={rec.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {rec.formation?.etablissement?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{rec.formation?.nom}</p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${score}%` }} />
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${badge}`}>{score}%</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Conseils reçus */}
      {conseils?.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">💬 Derniers conseils reçus</h2>
            <Link to="/mes-conseils" className="text-xs text-emerald-600 hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-3">
            {conseils.slice(0, 2).map((c) => (
              <div key={c.id} className="bg-white rounded-xl p-4 border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-bold">
                    {c.conseiller?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{c.conseiller?.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${c.type === 'suggestion' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {c.type === 'suggestion' ? '🎓 Suggestion' : '📝 Note'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{c.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
