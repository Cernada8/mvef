import Link from 'next/link'
import AnimatedSection from './AnimatedSection'
import { IconArrow, IconCheck } from './Icons'

const features = [
  'Plan nutricional antiinflamatorio personalizado',
  'Entrenamiento de fuerza progresivo adaptado a ti',
  'Coaching de mentalidad y hábitos sostenibles',
  'Seguimiento semanal con Yerlina',
  'Acceso directo por WhatsApp',
  'Revisiones quincenales de progreso',
]

const pillars = [
  { icon: '🥗', label: 'Nutrición' },
  { icon: '💪', label: 'Entrenamiento' },
  { icon: '🧠', label: 'Mentalidad' },
]

export default function Programs() {
  return (
    <section id="programas" className="py-24 lg:py-32 bg-beige-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <AnimatedSection className="mb-14">
          <span className="section-label">Programas</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-serif">
              Tu transformación,<br />
              <em className="not-italic text-green-mid">un solo método.</em>
            </h2>
            <p className="text-ink-light max-w-xs text-sm leading-relaxed sm:text-right">
              Un programa completo, diseñado específicamente para mujeres +35 que quieren resultados reales y duraderos.
            </p>
          </div>
        </AnimatedSection>

        {/* Single program card — split layout */}
        <AnimatedSection delay={80}>
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col lg:flex-row min-h-[520px]">

            {/* ── Left visual panel ── */}
            <div className="relative lg:w-[42%] flex-shrink-0 bg-gradient-to-br from-[#d6e4cc] via-[#c9dfc0] to-[#b8d0ac] flex flex-col justify-between p-8 lg:p-10 min-h-[280px] lg:min-h-0 overflow-hidden">

              {/* Decorative roman numeral */}
              <span
                className="pointer-events-none select-none absolute -bottom-6 -right-4 font-serif font-bold leading-none text-green-dark/[0.08]"
                style={{ fontSize: 'clamp(120px, 18vw, 200px)' }}
                aria-hidden="true"
              >
                I
              </span>

              {/* Decorative blob */}
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

              {/* Tag */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 bg-green-dark text-white text-[0.65rem] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-pale animate-pulse" />
                  Programa estrella
                </span>
              </div>

              {/* Name + tagline */}
              <div className="relative z-10 mt-auto">
                <p className="text-green-dark/60 text-xs font-semibold tracking-widest uppercase mb-2">Método 360° · Mujeres +35</p>
                <h3 className="font-serif font-bold text-ink-dark leading-none mb-3"
                  style={{ fontSize: 'clamp(2.6rem, 6vw, 4rem)' }}>
                  Full<br />
                  <em className="not-italic text-green-dark">Glow</em>
                </h3>
                <p className="text-ink-mid text-sm leading-relaxed max-w-[260px]">
                  La transformación completa: cuerpo, mente y hábitos. Para quien quiere un cambio real, no temporal.
                </p>

                {/* Pillars */}
                <div className="flex items-center gap-3 mt-5">
                  {pillars.map((p) => (
                    <div key={p.label} className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/40">
                      <span className="text-sm">{p.icon}</span>
                      <span className="text-xs font-semibold text-ink-dark">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right content panel ── */}
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">

              {/* Features grid */}
              <div>
                <p className="text-xs font-bold tracking-widest text-ink-light uppercase mb-5">Qué incluye</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-mid">
                      <span className="w-5 h-5 min-w-5 rounded-full bg-green-pale flex items-center justify-center mt-0.5 flex-shrink-0">
                        <IconCheck className="w-2.5 h-2.5 text-green-dark" />
                      </span>
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: quote + CTA */}
              <div className="border-t border-ink-dark/[0.07] pt-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

                {/* Quote */}
                <blockquote className="flex-1">
                  <p className="text-ink-dark font-serif italic text-[1.05rem] leading-snug mb-2 max-w-sm">
                    "No necesitas más fuerza de voluntad. Necesitas el método correcto."
                  </p>
                  <cite className="text-xs text-ink-light not-italic font-medium">— Yerlina, coach Mi Vida en Forma</cite>
                </blockquote>

                {/* CTA */}
                <Link
                  href="#contacto"
                  className="group inline-flex items-center justify-center gap-2 bg-green-dark hover:bg-green-mid text-white font-semibold px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
                >
                  Quiero empezar
                  <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
