'use client'

import { useState } from 'react'
import AnimatedSection from './AnimatedSection'

const faqs = [
  {
    q: '¿Este programa es solo para perder peso?',
    a: 'No. El objetivo es ayudarte a sentirte fuerte, con energía, desinflamada y más segura de ti misma. Muchas mujeres pierden grasa y medidas, pero también mejoran su fuerza, hábitos, autoestima y bienestar general.',
  },
  {
    q: '¿Funciona aunque tenga más de 40 años?',
    a: 'Sí, de hecho gran parte de mis alumnas tienen más de 40. El entrenamiento y la alimentación están enfocados en los cambios hormonales, metabolismo más lento, inflamación y pérdida de masa muscular que aparecen con los años.',
  },
  {
    q: '¿Necesito experiencia entrenando?',
    a: 'Para nada. Adaptamos el plan a tu nivel, desde cero hasta avanzado. Lo importante es empezar de manera inteligente y sostenible.',
  },
  {
    q: '¿También ayudas con inflamación abdominal y menopausia?',
    a: 'Sí. Trabajo muchísimo con mujeres que sienten hinchazón, cambios hormonales, fatiga, aumento de grasa abdominal o metabolismo lento. Es uno de mis focos principales.',
  },
  {
    q: '¿Tengo que pasar hambre o eliminar lo que me gusta?',
    a: 'No. Aprendemos a comer para nutrir el cuerpo, tener energía y mejorar la composición corporal sin vivir obsesionada con las calorías ni con restricciones. La idea es crear hábitos sostenibles, no vivir restringida.',
  },
  {
    q: '¿Cuánto tiempo necesito entrenar?',
    a: 'Mis planes están pensados para mujeres reales y ocupadas. Con 30-50 minutos bien hechos es más que suficiente. Puedes entrenar en gimnasio o desde casa según tu estilo de vida.',
  },
  {
    q: '¿En cuánto tiempo voy a notar cambios?',
    a: 'Cada cuerpo es distinto, pero muchas mujeres empiezan a sentirse con más energía y menos inflamación en pocas semanas. Los cambios físicos llegan con constancia y estrategia.',
  },
  {
    q: '¿Por qué tu método es diferente?',
    a: 'Porque no se basa en matarte a cardio ni comer poquísimo. Después de los 40 el cuerpo necesita estrategia, fuerza, buena alimentación y hábitos que puedas mantener de verdad. Más de 20 años de experiencia y +800 alumnas lo avalan.',
  },
  {
    q: '¿Cómo empiezo?',
    a: 'Solo tienes que rellenar el formulario y te contactaré personalmente para ver cuál es la mejor opción para ti 🤍',
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
                    className={`w-7 h-7 min-w-7 rounded-
full border flex items-center justify-center text-base leading-none transition-all duration-300 flex-shrink-0 ${
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
