import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import { IconStar } from './Icons'

// Las fotos de transformación ya son imágenes combinadas (antes izq + después der)
const testimonials = [
  {
    img:   '/tranformacion-1.jpg',
    quote: 'De sentirme mal conmigo misma, a quererme de nuevo y cuidar de mi salud.',
    name:  'Giovanna',
    loc:   'Tenerife',
  },
  {
    img:   '/tranformacion-2.jpg',
    quote: 'Yerlina me llevó de la mano hacia mi mejor versión. Súper agradecida.',
    name:  'Rebeca',
    loc:   'Vigo',
  },
  {
    img:   '/transformacion-3.jpg',
    quote: 'Yerlina transformó mi vida a mejor por completo. Aprendí muchísimo de ella.',
    name:  'Ena',
    loc:   'Venezolana en Madrid',
  },
]

export default function Testimonials() {
  return (
    <section id="resultados" className="py-24 lg:py-32 bg-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <AnimatedSection className="mb-14">
          <span className="section-label">Resultados reales</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-serif">
              Ellas ya
              <br />
              <em className="not-italic text-green-mid">lo lograron.</em>
            </h2>
            <p className="text-ink-light max-w-xs text-sm leading-relaxed sm:text-right">
              Mujeres reales, con vidas reales, que decidieron invertir en sí mismas.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 80}>
              <div className="bg-white rounded-3xl overflow-hidden border border-ink-dark/[0.05] group hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">

                {/* Transformation photo — full width, before+after ya combinados */}
                <div className="w-full aspect-square relative overflow-hidden">
                  <Image
                    src={t.img}
                    alt={`Antes y después de ${t.name} — transformación real con Mi Vida en Forma`}
                    fill
                    className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-600 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                  />
                  {/* Subtle antes/después labels */}
                  <div className="absolute inset-0 flex pointer-events-none">
                    <div className="flex-1 flex items-end justify-start p-3">
                      <span className="text-[0.6rem] font-semibold tracking-widest uppercase bg-black/25 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                        Antes
                      </span>
                    </div>
                    <div className="flex-1 flex items-end justify-end p-3">
                      <span className="text-[0.6rem] font-semibold tracking-widest uppercase bg-green-dark/60 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                        Después
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} className="w-3.5 h-3.5 text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-ink-mid italic mb-4 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-sm font-semibold text-ink-dark">
                    {t.name}{' '}
                    <span className="font-normal text-ink-light">— {t.loc}</span>
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
