import AnimatedSection from './AnimatedSection'

const steps = [
  {
    n:     '01',
    title: 'Rellena el formulario',
    desc:  'Cuéntame sobre ti, tus objetivos y tu estilo de vida. Menos de 3 minutos.',
  },
  {
    n:     '02',
    title: 'Hablamos por WhatsApp',
    desc:  'Me pongo en contacto contigo personalmente para organizar una llamada.',
  },
  {
    n:     '03',
    title: 'Comienza tu programa',
    desc:  'Conversamos sobre tus objetivos y ponemos en marcha tu plan personalizado.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <AnimatedSection className="mb-16">
          <span className="section-label">Cómo funciona</span>
          <h2 className="font-serif max-w-xl">
            Empezar es
            <br />
            <em className="not-italic text-green-mid">más fácil de lo que crees.</em>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-px bg-ink-dark/[0.07] rounded-3xl overflow-hidden">
          {steps.map((s, i) => (
            <AnimatedSection key={s.n} delay={i * 100}>
              <div className="bg-warm p-8 lg:p-10 h-full">
                <span className="font-serif text-5xl font-bold text-green-dark/15 block mb-6 leading-none select-none">
                  {s.n}
                </span>
                <h3 className="font-serif text-lg text-ink-dark mb-3">{s.title}</h3>
                <p className="text-sm text-ink-mid leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
