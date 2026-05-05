import Image from 'next/image'
import Link  from 'next/link'
import AnimatedSection from './AnimatedSection'
import { IconArrow } from './Icons'

const highlights = [
  { num: '+800', label: 'Clientas'          },
  { num: '+20',  label: 'Años experiencia'  },
  { num: '100%', label: 'Resultados reales' },
]

const credentials = [
  'Nutrición antiinflamatoria',
  'Entrenamiento femenino',
  'Coaching de hábitos',
  '+20 años de experiencia',
]

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 lg:py-32 bg-beige-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <AnimatedSection>
            <div className="relative">
              <div className="w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden relative group">
                <Image
                  src="/about-yerlina.jpg"
                  alt="Yerlina — Mi Vida en Forma"
                  fill
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
                />
              </div>

              {/* Credentials card */}
              <div className="absolute -bottom-6 -right-2 lg:-right-6 bg-white rounded-2xl p-5 shadow-lg border border-ink-dark/[0.05]">
                <p className="text-[0.62rem] font-semibold tracking-widest uppercase text-ink-light mb-3">Especialidades</p>
                <ul className="space-y-2">
                  {credentials.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-xs text-ink-mid">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-mid flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={100}>
            <span className="section-label">Sobre mí</span>
            <h2 className="font-serif mb-6">
              Soy Yerlina,
              <br />
              <em className="not-italic text-green-mid">una mujer real como tú.</em>
            </h2>
            <p className="text-ink-dark font-medium text-[1.05rem] mb-4 leading-relaxed">
              Con más de 20 años de experiencia en entrenamiento físico y nutrición saludable.
            </p>
            <p className="text-ink-mid leading-relaxed mb-4">
              Estoy aquí para ayudarte a sentirte fuerte, vital y llena de energía. Quiero
              acompañarte a mejorar tu calidad de vida, reducir la inflamación y recuperar
              el poder del entrenamiento con propósito.
            </p>
            <p className="text-ink-mid leading-relaxed mb-10">
              No estás sola. Estaré contigo cada día — guiándote, motivándote y celebrando
              cada pequeño avance del camino.
            </p>

            {/* Numbers */}
            <div className="flex gap-8 pb-10 border-b border-ink-dark/10 mb-10">
              {highlights.map((h) => (
                <div key={h.label}>
                  <span className="font-serif text-3xl font-bold text-green-dark block leading-none mb-1">
                    {h.num}
                  </span>
                  <span className="text-xs text-ink-light tracking-wide">{h.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="#contacto"
              className="inline-flex items-center gap-2.5 bg-green-dark hover:bg-green-mid text-white font-semibold px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group"
            >
              Trabaja conmigo
              <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
