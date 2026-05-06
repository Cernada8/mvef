'use client'

import { useState } from 'react'
import AnimatedSection from './AnimatedSection'
import { IconArrow, IconCheck } from './Icons'

// ─── Catálogo de productos ────────────────────────────────────────────────────
// Para añadir un producto nuevo: copia un objeto del array y cambia sus datos.
// stripePriceId: crea el precio en tu Stripe Dashboard y pega el ID aquí.
const products = [
  {
    id:             'guia-antiinflamatoria',
    name:           'Guía Antiinflamatoria',
    tagline:        'El punto de partida',
    desc:           'Plan de 21 días para reducir la inflamación, recuperar energía y empezar a sentirte bien desde dentro.',
    price:          '19€',
    stripePriceId:  'price_XXXXXXXXXXXXXXXX', // ← reemplaza con tu Price ID de Stripe
    features:       ['21 días de plan nutricional', 'Lista de la compra incluida', 'Guía en PDF descargable'],
    badge:          null,
  },
  {
    id:             'programa-define',
    name:           'Define & Tonifica',
    tagline:        'El más popular',
    desc:           'Programa de 8 semanas de entrenamiento y nutrición diseñado para mujeres +40 que quieren definir sin perder feminidad.',
    price:          '67€',
    stripePriceId:  'price_XXXXXXXXXXXXXXXX', // ← reemplaza con tu Price ID de Stripe
    features:       ['8 semanas de entrenamiento', 'Plan de nutrición semanal', 'Vídeos explicativos', 'Soporte por email'],
    badge:          'Más vendido',
  },
  {
    id:             'programa-360',
    name:           'Transforma 360°',
    tagline:        'Transformación completa',
    desc:           'El programa más completo: nutrición, entrenamiento, mentalidad y hábitos. Para quien quiere un cambio de verdad y para siempre.',
    price:          '127€',
    stripePriceId:  'price_XXXXXXXXXXXXXXXX', // ← reemplaza con tu Price ID de Stripe
    features:       ['12 semanas de programa completo', 'Nutrición antiinflamatoria', 'Módulo de hábitos y mindset', 'Acceso a comunidad privada', 'Sesión de bienvenida 1:1'],
    badge:          'Más completo',
  },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function Shop() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleBuy(priceId: string, productId: string) {
    setLoading(productId)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch (err) {
      console.error(err)
      alert('Hubo un problema al procesar el pago. Inténtalo de nuevo.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <section id="tienda" className="py-24 lg:py-32 bg-beige-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        <AnimatedSection className="mb-14 text-center">
          <span className="section-label">Recursos digitales</span>
          <h2 className="font-serif mb-4">
            Invierte en ti.
            <br />
            <em className="not-italic text-green-mid">Descarga y empieza hoy.</em>
          </h2>
          <p className="text-ink-light max-w-md mx-auto text-sm leading-relaxed">
            Guías y programas diseñados específicamente para mujeres +40.
            Compra una vez, accede para siempre.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 80}>
              <div className={`relative flex flex-col h-full bg-white rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${
                p.badge === 'Más vendido'
                  ? 'border-green-mid/40 shadow-md'
                  : 'border-ink-dark/[0.06]'
              }`}>

                {/* Badge */}
                {p.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[0.6rem] font-semibold tracking-widest uppercase bg-green-dark text-white px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Header */}
                  <p className="text-[0.65rem] font-semibold tracking-widest uppercase text-ink-light mb-2">{p.tagline}</p>
                  <h3 className="font-serif text-xl text-ink-dark mb-2">{p.name}</h3>
                  <p className="text-sm text-ink-mid leading-relaxed mb-5">{p.desc}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-mid">
                        <span className="w-4 h-4 bg-green-pale rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <IconCheck className="w-2.5 h-2.5 text-green-dark" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="pt-5 border-t border-ink-dark/[0.06]">
                    <div className="flex items-end justify-between mb-4">
                      <span className="font-serif text-3xl font-bold text-green-dark">{p.price}</span>
                      <span className="text-xs text-ink-light">Pago único · Acceso inmediato</span>
                    </div>
                    <button
                      onClick={() => handleBuy(p.stripePriceId, p.id)}
                      disabled={loading === p.id}
                      className="w-full inline-flex items-center justify-center gap-2 bg-green-dark hover:bg-green-mid text-white font-semibold px-5 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed group"
                    >
                      {loading === p.id ? 'Redirigiendo…' : 'Comprar ahora'}
                      {loading !== p.id && (
                        <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Trust bar */}
        <AnimatedSection delay={200}>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-ink-light">
            {['Pago seguro con Stripe', 'Acceso inmediato tras la compra', 'Garantía de satisfacción 14 días'].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="text-green-mid">✦</span>
                {t}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
