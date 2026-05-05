import Link from 'next/link'
import AnimatedSection from './AnimatedSection'
import { IconArrow, IconCheck } from './Icons'

const programs = [
  {
    tag:      'Más popular',
    title:    'Desinfláma',
    desc:     'Reduce la inflamación, mejora tu digestión y siéntete llena de energía desde la primera semana.',
    features: [
      'Plan nutricional antiinflamatorio',
      'Rutinas de movimiento suave',
      'Guía de hábitos diarios',
      'Seguimiento semanal',
    ],
    accent: 'from-[#e8ede0] to-[#d0dcc8]',
    label:  'I',
  },
  {
    tag:      'Define & Tonifica',
    title:    'Define & Tonifica',
    desc:     'Define tu cuerpo, mejora tu composición corporal y gana fuerza sin perder tu feminidad.',
    features: [
      'Entrenamiento de fuerza progresivo',
      'Nutrición para composición corporal',
      'Revisiones quincenales',
      'Soporte continuo por WhatsApp',
    ],
    accent: 'from-green-pale to-green-light/60',
    label:  'II',
  },
  {
    tag:      'Transforma 360°',
    title:    'Transforma 360°',
    desc:     'La transformación definitiva: cuerpo, mente y hábitos. Para quien quiere un cambio real y duradero.',
    features: [
      'Todo lo de Define & Tonifica',
      'Coaching de mentalidad y hábitos',
      'Seguimiento diario personalizado',
      'Acceso prioritario a Yerlina',
    ],
    accent: 'from-beige/60 to-green-light/50',
    label:  'III',
  },
]

export default function Programs() {
  return (
    <section id="programas" className="py-24 lg:py-32 bg-beige-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <AnimatedSection className="mb-14">
          <span className="section-label">Programas</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-serif">
              Elige tu camino.
              <br />
              <em className="not-italic text-green-mid">Yo te acompaño.</em>
            </h2>
            <p className="text-ink-light max-w-xs text-sm leading-relaxed sm:text-right">
              Cada mujer es única. Programas diseñados para distintos objetivos y momentos de vida.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 80}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
                {/* Header band */}
                <div className={`w-full aspect-[16/9] bg-gradient-to-br ${p.accent} flex items-end p-6 relative`}>
                  <span className="absolute top-4 left-4 bg-green-dark text-white text-[0.65rem] font-semibold tracking-widest px-3 py-1 rounded-full uppercase">
                    {p.tag}
                  </span>
                  <span className="font-serif text-5xl font-bold text-green-dark/15 absolute bottom-3 right-5 select-none leading-none">
                    {p.label}
                  </span>
                </div>

                {/* Body */}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-serif text-xl mb-3">{p.title}</h3>
                  <p className="text-sm text-ink-mid mb-6 flex-1 leading-relaxed">{p.desc}</p>

                  <ul className="space-y-2.5 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-mid">
                        <span className="w-4 h-4 min-w-4 rounded-full bg-green-pale flex items-center justify-center mt-0.5">
                          <IconCheck className="w-2.5 h-2.5 text-green-dark" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="#contacto"
                    className="inline-flex items-center justify-center gap-2 bg-green-dark hover:bg-green-mid text-white font-semibold px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group"
                  >
                    Ver programa
                    <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
