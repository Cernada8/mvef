'use client'

import { useState } from 'react'
import AnimatedSection from './AnimatedSection'

const faqs = [
  {
    q: '¿Necesito ir al gimnasio para trabajar contigo?',
    a: 'No es necesario. Puedo diseñar un programa que se adapte perfectamente a tu situación, ya sea en casa, en el gimnasio o al aire libre. Lo importante es que encaje con tu vida.',
  },
  {
    q: '¿Tienes en cuenta mis restricciones alimentarias?',
    a: 'Absolutamente. Siempre personalizo el plan nutricional teniendo en cuenta tus preferencias, intolerancias, alergias y objetivos. Mi enfoque es que comas bien y lo disfrutes.',
  },
  {
    q: '¿Cómo se realizan las revisiones de progreso?',
    a: 'Las revisiones son semanales a través de la app. Me envías tus métricas, fotos y cómo te has sentido durante la semana. Yo analizo todo y ajusto el plan si es necesario.',
  },
  {
    q: '¿Existe algún período mínimo para trabajar contigo?',
    a: 'Los programas tienen una duración mínima recomendada para garantizar resultados reales y duraderos. En nuestra llamada inicial te explico las opciones disponibles.',
  },
  {
    q: '¿Tengo que pagar por adelantado o puedo pagar mes a mes?',
    a: 'Tengo opciones flexibles de pago. En nuestra llamada te explico los detalles de cada programa y encontramos la opción que mejor se adapta a ti.',
  },
  {
    q: '¿Cuánto cuesta el programa personalizado?',
    a: 'El precio varía según el programa y la duración. Rellena el formulario y hablamos — siempre hay una opción que encaja con tu situación e inversión.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <AnimatedSection className="mb-14">
          <span className="section-label">Preguntas frecuentes</span>
          <h2 className="font-serif">
            ¿Tienes dudas?
            <br />
            <em className="not-italic text-green-mid">Tengo respuestas.</em>
          </h2>
        </AnimatedSection>

        <div className="max-w-3xl divide-y divide-ink-dark/[0.08]">
          {faqs.map((f, i) => (
            <AnimatedSection key={i} delay={i * 40}>
              <div>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left font-serif font-semibold text-ink-dark hover:text-green-dark transition-colors text-[1rem]"
                >
                  {f.q}
                  <span
                    className={`w-7 h-7 min-w-7 rounded-full border flex items-center justify-center text-base leading-none transition-all duration-300 flex-shrink-0 ${
                      open === i
                        ? 'bg-green-dark border-green-dark text-white rotate-45'
                        : 'border-ink-dark/20 text-ink-mid'
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: open === i ? '300px' : '0px' }}
                >
                  <p className="pb-6 text-[0.93rem] text-ink-mid leading-relaxed">{f.a}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
