import Image from 'next/image'
import Link  from 'next/link'
import AnimatedSection from './AnimatedSection'
import { IconArrow, IconTrophy, IconSparkle } from './Icons'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center bg-gradient-to-br from-green-xpale via-warm to-beige-light pt-20 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-green-mid/[0.05]" />
      <div className="pointer-events-none absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-beige/[0.10]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Content */}
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 border border-green-mid/25 text-green-dark text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-mid" />
              Coaching Online · Mujeres +35
            </div>

            <h1 className="font-serif font-bold text-ink-dark mb-6 leading-[1.1]">
              <em className="not-italic text-green-mid">Vive más joven</em>
              <br />por más tiempo.
            </h1>

            <p className="text-ink-mid leading-relaxed mb-10 max-w-md text-[1.05rem]">
              Pierde grasa, reduce la inflamación y recupera tu energía con un método
              sostenible — sin dietas extremas, sin horas interminables en el gym.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <Link
                href="#contacto"
                className="inline-flex items-center gap-2.5 bg-green-dark hover:bg-green-mid text-white font-semibold px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group"
              >
                Quiero mi transformación
                <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#metodo"
                className="inline-flex items-center gap-2 text-green-dark hover:text-green-mid font-medium text-sm transition-colors duration-200 group"
              >
                Conoce el método
                <IconArrow className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-8 border-t border-ink-dark/[0.08]">
              <div className="flex -space-x-2.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-green-pale to-beige-light overflow-hidden">
                    <svg className="w-full h-full text-green-mid/60" viewBox="0 0 36 36" fill="currentColor">
                      <circle cx="18" cy="14" r="6"/>
                      <ellipse cx="18" cy="30" rx="11" ry="8"/>
                    </svg>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-dark">+800 mujeres transformadas</p>
                <p className="text-xs text-ink-light mt-0.5">Se sienten jóvenes y llenas de energía</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Visual */}
          <AnimatedSection delay={150} className="flex justify-center order-first lg:order-none">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">

              {/* Main photo */}
              <div className="w-full aspect-[3/4] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden relative">
                <Image
                  src="/foto-yerlina-principal.png"
                  alt="Yerlina — Coach Mi Vida en Forma"
                  fill
                  className="object-cover object-center hover:scale-[1.03] transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                  priority
                />
              </div>

              {/* Float card — bottom right (visible desde sm) */}
              <div className="absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-5 bg-white rounded-2xl p-3 sm:p-4 shadow-lg flex items-center gap-2.5 sm:gap-3 border border-ink-dark/[0.05] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-pale rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconTrophy className="w-4 h-4 sm:w-5 sm:h-5 text-green-dark" />
                </div>
                <div>
                  <p className="text-[0.75rem] sm:text-[0.8rem] font-semibold text-ink-dark leading-tight">Método 360°</p>
                  <p className="text-[0.65rem] sm:text-[0.7rem] text-ink-light">Cuerpo · Mente · Hábitos</p>
                </div>
              </div>

              {/* Float card — top left (visible desde sm) */}
              <div className="absolute -top-4 -left-3 sm:-top-5 sm:-left-5 bg-white rounded-2xl p-3 sm:p-4 shadow-lg flex items-center gap-2.5 sm:gap-3 border border-ink-dark/[0.05] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-pale rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconSparkle className="w-4 h-4 sm:w-5 sm:h-5 text-green-dark" />
                </div>
                <div>
                  <p className="text-[0.75rem] sm:text-[0.8rem] font-semibold text-ink-dark leading-tight">+20 años</p>
                  <p className="text-[0.65rem] sm:text-[0.7rem] text-ink-light">de experiencia</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
