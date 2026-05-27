import Image from 'next/image'
import Link  from 'next/link'
import AnimatedSection from './AnimatedSection'
import { IconLeaf, IconDumbbell, IconBrain, IconArrow } from './Icons'

const pillars = [
  {
    icon:  <IconLeaf className="w-5 h-5 text-white" />,
    title: 'Nutrición real',
    desc:  'Come rico, variado y sin restricciones innecesarias. Aprende a nutrir tu cuerpo sin pasarla mal.',
  },
  {
    icon:  <IconDumbbell className="w-5 h-5 text-white" />,
    title: 'Entrenamiento inteligente',
    desc:  'Rutinas efectivas adaptadas a tu cuerpo y tu vida. Sin lesiones, sin sobrecarga.',
  },
  {
    icon:  <IconBrain className="w-5 h-5 text-white" />,
    title: 'Mentalidad y hábitos',
    desc:  'Cambia tu mente, organiza tu vida y mantén tus resultados para siempre.',
  },
]

export default function Method() {
  return (
    <section id="metodo" className="py-24 lg:py-32 bg-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Photo */}
          <AnimatedSection className="flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-[460px] aspect-[4/5] rounded-[2.5rem] overflow-hidden relative group">
              <Image
                src="/mi-metodo.jpg"
                alt="Yerlina mostrando su método 360° de entrenamiento y nutrición para mujeres +35"
                fill
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-dark/20 to-transparent" />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={100} className="order-1 lg:order-2">
            <span className="section-label">Mi método</span>
            <h2 className="font-serif mb-5">
              Mucho más que entrenar
              <br />
              <em className="not-italic text-green-mid">y comer bien.</em>
            </h2>
            <p className="text-ink-mid leading-relaxed mb-10 max-w-lg">
              Mi método combina nutrición antiinflamatoria, entrenamiento inteligente y
              trabajo mental para que consigas resultados que se mantienen en el tiempo.
            </p>

            <div className="space-y-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-4 items-start p-5 bg-green-xpale rounded-2xl border border-transparent hover:border-green-mid/20 hover:shadow-sm hover:translate-x-1 transition-all duration-300 cursor-default"
                >
                  <div className="w-11 h-11 min-w-11 bg-green-dark rounded-xl flex items-center justify-center flex-shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-ink-dark mb-1 text-[1rem]">{p.title}</h4>
                    <p className="text-sm text-ink-mid m-0 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#contacto"
              className="inline-flex items-center gap-2.5 mt-10 bg-green-dark hover:bg-green-mid text-white font-semibold px-6 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group"
            >
              Conoce mi método completo
              <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
      </div>
    </div>
  </section>
  )
}
