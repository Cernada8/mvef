import AnimatedSection from './AnimatedSection'
import ContactForm from './ContactForm'

export default function CTA() {
  return (
    <section
      id="contacto"
      className="py-24 lg:py-32 bg-green-dark relative overflow-hidden"
    >
      {/* Textura sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />
      <div className="pointer-events-none absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-green-mid/20" />
      <div className="pointer-events-none absolute -bottom-1/3 -left-1/4 w-[400px] h-[400px] rounded-full bg-green-mid/10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Texto izquierda ── */}
          <AnimatedSection className="lg:pt-6">
            <span className="section-label" style={{ color: 'rgba(255,255,255,.4)' }}>
              Empieza hoy
            </span>
            <h2 className="font-serif text-white mb-5">
              ¿Lista para sentirte
              <br />
              <em className="not-italic text-white/70">joven y llena de energía?</em>
            </h2>
            <p className="text-white/65 text-[1.02rem] leading-relaxed mb-8 max-w-md">
              Responde unas preguntas rápidas y me pongo en contacto contigo personalmente en menos de 24 horas.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">✅</span>
                <p className="text-white/70 text-sm leading-relaxed">Plan 100% personalizado a tu cuerpo y ritmo de vida</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">✅</span>
                <p className="text-white/70 text-sm leading-relaxed">Sin dietas extremas ni horas interminables en el gym</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">✅</span>
                <p className="text-white/70 text-sm leading-relaxed">Acompañamiento directo con Yerlina en cada paso</p>
              </div>
            </div>

            <p className="mt-8 text-xs text-white/35 tracking-wide">
              Sin compromiso · Sin presión · Solo una conversación
            </p>
          </AnimatedSection>

          {/* ── Formulario derecha ── */}
          <AnimatedSection delay={120}>
            <ContactForm />
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
