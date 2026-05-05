import AnimatedSection from './AnimatedSection'
import { IconDumbbell, IconLeaf, IconCalendar, IconMessage, IconPhone, IconBrain } from './Icons'

const features = [
  {
    icon:  <IconDumbbell className="w-5 h-5 text-green-dark" />,
    title: 'Entrenamientos personalizados',
    desc:  'Rutinas en casa o gym adaptadas a tu nivel y disponibilidad, que evolucionan contigo.',
  },
  {
    icon:  <IconLeaf className="w-5 h-5 text-green-dark" />,
    title: 'Plan nutricional a medida',
    desc:  'Sin restricciones absurdas. Comida real que disfrutas y que nutre tu cuerpo de verdad.',
  },
  {
    icon:  <IconCalendar className="w-5 h-5 text-green-dark" />,
    title: 'Revisiones semanales',
    desc:  'Seguimiento cada semana para ajustar, medir avances y mantenerte en el camino correcto.',
  },
  {
    icon:  <IconMessage className="w-5 h-5 text-green-dark" />,
    title: 'Comunicación continua',
    desc:  'Acceso directo a Yerlina. Te acompaño, guío y motivo cuando más lo necesitas.',
  },
  {
    icon:  <IconPhone className="w-5 h-5 text-green-dark" />,
    title: 'App propia incluida',
    desc:  'Accede a tu plan, diario de comidas, rutinas y progreso desde tu móvil en cualquier momento.',
  },
  {
    icon:  <IconBrain className="w-5 h-5 text-green-dark" />,
    title: 'Trabajo de mentalidad',
    desc:  'El cambio real empieza en la cabeza. Construimos juntas los hábitos que lo hacen sostenible.',
  },
]

export default function Features() {
  return (
    <section className="py-24 lg:py-32 bg-green-xpale">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <AnimatedSection className="mb-14">
          <span className="section-label">Tu mentoría incluye</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-serif">
              Todo lo que necesitas
              <br />
              <em className="not-italic text-green-mid">para transformarte.</em>
            </h2>
            <p className="text-ink-light max-w-xs text-sm leading-relaxed sm:text-right">
              Un sistema completo, diseñado para que no te falte nada.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 60}>
              <div className="bg-white rounded-2xl p-6 flex gap-4 border border-transparent hover:border-green-mid/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-12 h-12 min-w-12 bg-green-pale rounded-xl flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-ink-dark mb-1.5 text-[0.95rem]">{f.title}</h4>
                  <p className="text-sm text-ink-mid m-0 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
