import Link from 'next/link'
import AnimatedSection from './AnimatedSection'
import { IconArrow } from './Icons'

export default function CTA() {
  return (
    <section
      id="contacto"
      className="py-24 lg:py-32 bg-green-dark relative overflow-hidden"
    >
      {/* Subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />
      <div className="pointer-events-none absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-green-mid/20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-2xl">
          <AnimatedSection>
            <span className="section-label" style={{ color: 'rgba(255,255,255,.4)' }}>
              Empieza hoy
            </span>
            <h2 className="font-serif text-white mb-5">
              ¿Lista para sentirte
              <br />
              <em className="not-italic text-white/70">joven y llena de energía?</em>
            </h2>
            <p className="text-white/65 text-[1.02rem] leading-relaxed mb-10 max-w-lg">
              Da el primer paso. Rellena el formulario y me pongo en contacto contigo
              en menos de 24 horas.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="https://wa.me/34000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-green-pale text-green-dark font-semibold px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group"
              >
                Quiero empezar mi transformación
                <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="mt-6 text-xs text-white/35 tracking-wide">
              Sin compromiso · Sin presión · Solo una conversación
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
