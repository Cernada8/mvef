'use client'

import { useState } from 'react'
import AnimatedSection from './AnimatedSection'
import { IconCheck, IconArrow } from './Icons'

const benefits = [
  'Los 3 errores más comunes en mujeres +40 que bloquean los resultados',
  'Qué alimentos reducen la inflamación (y cuáles la disparan sin que lo sepas)',
  'Cómo estructurar tu semana de entrenamiento sin agotarte',
  'El mindset que cambia todo: de la disciplina al autocuidado',
]

export default function LeadMagnet() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg,  setErrMsg]  = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error desconocido')
      setStatus('success')
    } catch (err: unknown) {
      setErrMsg(err instanceof Error ? err.message : 'Algo salió mal. Inténtalo de nuevo.')
      setStatus('error')
    }
  }

  return (
    <section id="guia-gratis" className="py-24 lg:py-32 bg-green-dark relative overflow-hidden">
      {/* Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />
      <div className="pointer-events-none absolute -top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-green-mid/25" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — copy */}
          <AnimatedSection>
            <span className="section-label" style={{ color: 'rgba(255,255,255,.4)' }}>
              Guía gratuita
            </span>
            <h2 className="font-serif text-white mb-4">
              Descarga gratis la guía
              <br />
              <em className="not-italic text-white/65">para mujeres +40</em>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8 max-w-md">
              Aprende las claves que nadie te ha contado sobre entrenamiento y nutrición
              en esta etapa de tu vida. Sin tecnicismos, sin restricciones, con resultados.
            </p>

            <ul className="space-y-3.5 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <IconCheck className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-sm text-white/75 leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <div className="inline-flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-3 border border-white/10">
              <span className="text-2xl font-serif text-white font-bold">🎁</span>
              <p className="text-sm text-white/80 leading-tight">
                Además recibirás un <strong className="text-white">10% de descuento</strong> exclusivo
                para usar en cualquier programa.
              </p>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection delay={120}>
            {status === 'success' ? (
              <div className="bg-white rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
                <div className="w-16 h-16 bg-green-pale rounded-full flex items-center justify-center mx-auto mb-5">
                  <IconCheck className="w-8 h-8 text-green-dark" />
                </div>
                <h3 className="font-serif text-2xl text-ink-dark mb-3">¡Ya está en camino!</h3>
                <p className="text-ink-mid text-sm leading-relaxed mb-6">
                  Revisa tu bandeja de entrada — la guía llegará en los próximos minutos.
                </p>
                <div className="bg-green-xpale border border-green-mid/20 rounded-2xl px-6 py-5">
                  <p className="text-xs text-ink-light uppercase tracking-widest font-semibold mb-2">Tu código de descuento</p>
                  <p className="font-serif text-3xl font-bold text-green-dark tracking-wider">BIENVENIDA10</p>
                  <p className="text-xs text-ink-light mt-2">10% de descuento en cualquier programa</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl"
              >
                <h3 className="font-serif text-xl text-ink-dark mb-1">Quiero mi guía gratis</h3>
                <p className="text-sm text-ink-light mb-7">Sin spam. Solo contenido que te va a servir de verdad.</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-ink-mid uppercase tracking-wide mb-1.5">
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ana"
                      required
                      className="w-full border border-ink-dark/10 rounded-xl px-4 py-3 text-sm text-ink-dark placeholder:text-ink-light/60 focus:outline-none focus:ring-2 focus:ring-green-mid/40 focus:border-green-mid transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-mid uppercase tracking-wide mb-1.5">
                      Tu email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ana@ejemplo.com"
                      required
                      className="w-full border border-ink-dark/10 rounded-xl px-4 py-3 text-sm text-ink-dark placeholder:text-ink-light/60 focus:outline-none focus:ring-2 focus:ring-green-mid/40 focus:border-green-mid transition"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-xs mb-4">{errMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-green-dark hover:bg-green-mid text-white font-semibold px-6 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {status === 'loading' ? 'Enviando…' : 'Quiero la guía + mi descuento'}
                  {status !== 'loading' && (
                    <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>

                <p className="text-[0.65rem] text-ink-light/60 mt-4 text-center">
                  Tus datos están seguros. Puedes darte de baja cuando quieras.
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
