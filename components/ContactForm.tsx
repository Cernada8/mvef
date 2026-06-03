'use client'

import { useState } from 'react'
import AnimatedSection from './AnimatedSection'

/* ─── Tipos ───────────────────────────────────────────────── */
interface FormData {
  edad:      string
  objetivo:  string
  bloqueo:   string
  mensaje:   string
  inversion: string
  nombre:    string
  email:     string
  telefono:  string
  pais:      string
  instagram: string
}

const TOTAL_STEPS = 6

/* ─── Opciones ────────────────────────────────────────────── */
const edadOpts     = ['25 - 35 años', '35 - 45 años', 'Más de 45 años']
const objetivoOpts = ['Perder grasa 🍏', 'Tonificar 💪', 'Reducir inflamación/Celulitis ✨', 'Otro 🙈']
const bloqueoOpts  = ['Estancamiento/poco tiempo ⏰', 'Falta de organización 🧚', 'No estoy motivada 🙁', 'Otros']
const inversionOpts = [
  { label: 'No me siento preparada para invertir', value: 'no' },
  { label: 'Por supuesto Yerlina, ¡es mi momento! ¡empezamos ya!', value: 'si' },
]

/* ─── Componentes auxiliares ──────────────────────────────── */
function OptionButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-6 py-4 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
        selected
          ? 'border-green-dark bg-green-dark text-white shadow-md'
          : 'border-green-mid/25 bg-white text-ink-dark hover:border-green-mid hover:bg-green-xpale'
      }`}
    >
      {label}
    </button>
  )
}

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100)
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-ink-light font-medium">Paso {step} de {TOTAL_STEPS}</span>
        <span className="text-xs text-green-dark font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-green-pale rounded-full overflow-hidden">
        <div
          className="h-full bg-green-dark rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/* ─── Componente principal ────────────────────────────────── */
export default function ContactForm() {
  const [step, setStep]       = useState(1)
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  const [data, setData] = useState<FormData>({
    edad: '', objetivo: '', bloqueo: '', mensaje: '',
    inversion: '', nombre: '', email: '', telefono: '',
    pais: 'España', instagram: '',
  })

  const set = (key: keyof FormData, val: string) => setData(d => ({ ...d, [key]: val }))

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  /* Cuando eligen "No me siento preparada" saltamos a un step especial */
  const pickInversion = (val: string) => {
    set('inversion', val)
    if (val === 'no') { setStep(7); return }   // step 7 = pantalla "no lista"
    next()
  }

  const canNext = () => {
    if (step === 1) return !!data.edad
    if (step === 2) return !!data.objetivo
    if (step === 3) return !!data.bloqueo
    if (step === 4) return data.mensaje.trim().length > 5
    if (step === 5) return !!data.inversion
    return true
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.nombre || !data.email) { setError('Nombre y email son obligatorios'); return }
    setSending(true); setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Error')
      setSent(true)
    } catch {
      setError('Algo salió mal. Inténtalo de nuevo o escríbeme por WhatsApp.')
    } finally {
      setSending(false)
    }
  }

  /* ─── Estados finales ──────────────────────────────── */

  // "No lista" — mensaje de ánimo
  if (step === 7) {
    return (
      <div className="text-center py-8 px-4 max-w-md mx-auto">
        <div className="text-5xl mb-4">🌱</div>
        <h3 className="font-serif text-2xl text-white mb-3">No pasa nada</h3>
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          Cuando te sientas lista, aquí estaré. Mientras tanto, descárgate mi guía gratuita y empieza a conocer el método.
        </p>
        <button
          onClick={() => { setStep(1); setData(d => ({ ...d, inversion: '' })) }}
          className="text-white/50 text-xs underline hover:text-white transition-colors"
        >
          ← Volver al formulario
        </button>
      </div>
    )
  }

  // Enviado con éxito
  if (sent) {
    return (
      <div className="text-center py-8 px-4 max-w-md mx-auto">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-serif text-2xl text-white mb-3">¡Recibido!</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Te escribiré personalmente en menos de 24 horas. Revisa también tu bandeja de entrada.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-xl">
        <ProgressBar step={step} />

        {/* ── Step 1: Edad ── */}
        {step === 1 && (
          <div>
            <h3 className="font-serif text-xl text-ink-dark mb-6 text-center">¿Cuál es tu edad?</h3>
            <div className="flex flex-col gap-3">
              {edadOpts.map(o => (
                <OptionButton key={o} label={o} selected={data.edad === o} onClick={() => set('edad', o)} />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Objetivo ── */}
        {step === 2 && (
          <div>
            <h3 className="font-serif text-xl text-ink-dark mb-6 text-center">¿Cuál es tu objetivo?</h3>
            <div className="grid grid-cols-2 gap-3">
              {objetivoOpts.map(o => (
                <OptionButton key={o} label={o} selected={data.objetivo === o} onClick={() => set('objetivo', o)} />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Bloqueo ── */}
        {step === 3 && (
          <div>
            <h3 className="font-serif text-xl text-ink-dark mb-6 text-center leading-snug">
              ¿Qué crees que te bloquea a la hora de lograr tu objetivo?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {bloqueoOpts.map(o => (
                <OptionButton key={o} label={o} selected={data.bloqueo === o} onClick={() => set('bloqueo', o)} />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 4: Mensaje libre ── */}
        {step === 4 && (
          <div>
            <h3 className="font-serif text-xl text-ink-dark mb-2 text-center leading-snug">
              ¿Cómo te puedo ayudar a cumplir tus objetivos?
            </h3>
            <p className="text-xs text-ink-light text-center mb-5">¿Qué quieres trabajar?</p>
            <textarea
              value={data.mensaje}
              onChange={e => set('mensaje', e.target.value)}
              placeholder="Escribe aquí..."
              rows={5}
              className="w-full border border-green-mid/25 rounded-2xl px-5 py-4 text-sm text-ink-dark placeholder-ink-light/50 focus:outline-none focus:border-green-mid resize-none transition-colors"
            />
          </div>
        )}

        {/* ── Step 5: Inversión ── */}
        {step === 5 && (
          <div>
            <h3 className="font-serif text-lg text-ink-dark mb-6 text-center leading-snug">
              Mi plan personalizado requiere una inversión.<br />
              <em className="not-italic text-green-dark">¿Estás lista para invertir tiempo y dinero en ti?</em>
            </h3>
            <div className="flex flex-col gap-3">
              {inversionOpts.map(o => (
                <OptionButton
                  key={o.value}
                  label={o.label}
                  selected={data.inversion === o.value}
                  onClick={() => pickInversion(o.value)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 6: Datos de contacto ── */}
        {step === 6 && (
          <form onSubmit={submit}>
            <h3 className="font-serif text-xl text-ink-dark mb-6 text-center">Información de contacto</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text" placeholder="Tu nombre completo" required
                value={data.nombre} onChange={e => set('nombre', e.target.value)}
                className="w-full border border-green-mid/25 rounded-2xl px-5 py-3.5 text-sm text-ink-dark placeholder-ink-light/50 focus:outline-none focus:border-green-mid transition-colors"
              />
              <input
                type="email" placeholder="Tu correo electrónico" required
                value={data.email} onChange={e => set('email', e.target.value)}
                className="w-full border border-green-mid/25 rounded-2xl px-5 py-3.5 text-sm text-ink-dark placeholder-ink-light/50 focus:outline-none focus:border-green-mid transition-colors"
              />
              <div className="flex items-center border border-green-mid/25 rounded-2xl overflow-hidden focus-within:border-green-mid transition-colors">
                <span className="px-4 py-3.5 text-sm text-ink-light bg-green-xpale border-r border-green-mid/20 flex-shrink-0">
                  🇪🇸 +34
                </span>
                <input
                  type="tel" placeholder="600 000 000"
                  value={data.telefono} onChange={e => set('telefono', e.target.value)}
                  className="flex-1 px-4 py-3.5 text-sm text-ink-dark placeholder-ink-light/50 focus:outline-none bg-transparent"
                />
              </div>
              <input
                type="text" placeholder="País"
                value={data.pais} onChange={e => set('pais', e.target.value)}
                className="w-full border border-green-mid/25 rounded-2xl px-5 py-3.5 text-sm text-ink-dark placeholder-ink-light/50 focus:outline-none focus:border-green-mid transition-colors"
              />
              <input
                type="text" placeholder="Perfil Instagram @"
                value={data.instagram} onChange={e => set('instagram', e.target.value)}
                className="w-full border border-green-mid/25 rounded-2xl px-5 py-3.5 text-sm text-ink-dark placeholder-ink-light/50 focus:outline-none focus:border-green-mid transition-colors"
              />

              {error && <p className="text-red-500 text-xs text-center">{error}</p>}

              <p className="text-[0.68rem] text-ink-light leading-relaxed text-center px-2 mt-1">
                Cuando envíes el formulario, tus datos se utilizarán para enviarte información sobre el programa. Puedes darte de baja en cualquier momento.
              </p>

              <div className="flex gap-3 mt-2">
                <button
                  type="button" onClick={prev}
                  className="flex-1 py-3.5 rounded-full border border-ink-dark/15 text-ink-mid text-sm font-medium hover:bg-green-xpale transition-colors"
                >
                  ← Atrás
                </button>
                <button
                  type="submit" disabled={sending}
                  className="flex-1 py-3.5 rounded-full bg-green-dark hover:bg-green-mid text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Enviando…' : 'Contáctame →'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ── Navegación (steps 1-4) ── */}
        {step < 5 && (
          <div className="flex items-center justify-between mt-6">
            {step > 1 ? (
              <button onClick={prev} className="text-ink-light text-sm hover:text-ink-dark transition-colors flex items-center gap-1">
                ← Atrás
              </button>
            ) : <div />}
            <button
              onClick={next}
              disabled={!canNext()}
              className="ml-auto px-7 py-2.5 bg-green-dark hover:bg-green-mid text-white text-sm font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Continuar →
            </button>
          </div>
        )}
        {/* Step 5 navigation back only */}
        {step === 5 && (
          <div className="mt-4 text-center">
            <button onClick={prev} className="text-ink-light text-sm hover:text-ink-dark transition-colors">
              ← Atrás
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
