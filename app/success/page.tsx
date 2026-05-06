import Link from 'next/link'
import { IconCheck } from '@/components/Icons'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-xpale via-warm to-beige-light flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        <div className="w-20 h-20 bg-green-pale rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <IconCheck className="w-10 h-10 text-green-dark" />
        </div>

        <h1 className="font-serif text-3xl text-ink-dark mb-3">
          ¡Pago completado!
        </h1>
        <p className="text-ink-mid leading-relaxed mb-4">
          Gracias por confiar en Yerlina y en <strong className="text-ink-dark">Mi Vida en Forma</strong>.
          Recibirás un email con tu descarga en los próximos minutos.
        </p>
        <p className="text-sm text-ink-light mb-8">
          Si no lo ves, revisa la carpeta de spam o escríbenos a{' '}
          <a href="mailto:hola@mvf.coach" className="text-green-dark hover:underline">hola@mvf.coach</a>.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-dark hover:bg-green-mid text-white font-semibold px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          Volver a la web
        </Link>
      </div>
    </main>
  )
}
