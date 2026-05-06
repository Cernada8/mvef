import AnimatedSection from './AnimatedSection'

export default function EmotionalHook() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-green-xpale/60" />
      <div className="pointer-events-none absolute -bottom-1/2 -right-1/4 w-[400px] h-[400px] rounded-full bg-beige-light/70" />

      <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center relative z-10">
        <AnimatedSection>
          <span className="section-label">Esto es para ti</span>

          <h2 className="font-serif text-ink-dark mb-8 leading-[1.2]">
            Si sientes que tu cuerpo{' '}
            <em className="not-italic text-green-mid">ya no responde como antes…</em>
          </h2>

          <p className="text-ink-mid text-[1.08rem] leading-relaxed mb-6 max-w-2xl mx-auto">
            Que tienes menos energía, que te cuesta verte bien, que has probado de todo
            y nada funciona de forma duradera… <strong className="text-ink-dark font-semibold">no es falta de disciplina.</strong>
          </p>

          <div className="inline-block bg-green-xpale border border-green-mid/20 rounded-3xl px-8 py-7 mb-8 max-w-2xl">
            <p className="text-green-dark font-serif text-[1.15rem] leading-relaxed font-medium">
              &ldquo;Es falta de estrategia. Y eso tiene solución.&rdquo;
            </p>
          </div>

          <p className="text-ink-mid text-[1.05rem] leading-relaxed max-w-xl mx-auto">
            Aquí vas a aprender a entrenar y cuidarte de forma <strong className="text-ink-dark font-semibold">inteligente</strong> — adaptada
            a tu cuerpo, a tus hormonas y a tu vida — para verte y sentirte mejor que nunca.
          </p>

          {/* Three mini stats inline */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { icon: '✦', text: 'Sin dietas extremas' },
              { icon: '✦', text: 'Sin horas en el gym' },
              { icon: '✦', text: 'Con resultados reales' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-ink-mid">
                <span className="text-green-mid text-xs">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
