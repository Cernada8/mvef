import AnimatedSection from './AnimatedSection'

const pillars = [
  {
    value: '47',
    suffix: 'años',
    label: 'Vivo lo que te enseño',
    sub: 'No paro. Tú tampoco tendrás que hacerlo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.379 3.967 1 7.5 1 9.57 1 11.3 1.988 12 3.24 12.7 1.988 14.43 1 16.5 1 20.033 1 23 3.379 23 7.191c0 4.105-5.37 8.863-11 14.402z" />
      </svg>
    ),
  },
  {
    value: '+20',
    suffix: 'años',
    label: 'de experiencia',
    sub: 'Entrenando y viviendo saludable cada día.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.09 6.26L20 9.27l-5 4.87L16.18 21 12 17.77 7.82 21 9 14.14 4 9.27l5.91-.91z" />
      </svg>
    ),
  },
  {
    value: '+288K',
    suffix: '',
    label: 'seguidoras en Instagram',
    sub: 'Una comunidad real de mujeres que avanzan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function AuthorityBar() {
  return (
    <section className="py-12 lg:py-16 bg-beige-light border-y border-ink-dark/[0.06] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #2d4a2d 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <AnimatedSection>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-ink-light mb-8">
            Por qué confiar en Yerlina
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          {pillars.map((p, i) => (
            <AnimatedSection key={p.label} delay={i * 100}>
              <div className="flex items-start gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm border border-ink-dark/[0.05] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 bg-green-xpale rounded-xl flex items-center justify-center flex-shrink-0 text-green-dark">
                  {p.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="font-serif text-2xl font-bold text-ink-dark leading-none">{p.value}</span>
                    {p.suffix && (
                      <span className="text-sm font-semibold text-green-mid">{p.suffix}</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-ink-dark leading-tight">{p.label}</p>
                  <p className="text-xs text-ink-light mt-0.5 leading-snug">{p.sub}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
