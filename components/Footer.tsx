import Image from 'next/image'
import Link  from 'next/link'
import { IconInstagram } from './Icons'

const nav = [
  { href: '#sobre-mi',   label: 'Sobre mí'   },
  { href: '#metodo',     label: 'Mi método'  },
  { href: '#programas',  label: 'Programas'  },
  { href: '#resultados', label: 'Resultados' },
]

const contact = [
  { href: '#contacto',                                      label: 'Empieza hoy'                    },
  { href: 'https://www.instagram.com/mivida_enforma/',      label: '@mivida_enforma'                 },
  { href: 'mailto:yerlina@email.mividaenforma.com',         label: 'yerlina@email.mividaenforma.com' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-dark pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="#inicio" className="flex items-center gap-3 mb-4">
              <Image src="/logo-mvef.png" alt="Logo Mi Vida en Forma — Coaching online con Yerlina" width={38} height={38} />
              <span className="font-serif font-bold text-white leading-tight text-[0.95rem]">
                Mi Vida en Forma
                <span className="block font-sans font-normal text-[0.58rem] tracking-widest uppercase text-white/30">
                  Con Yerlina
                </span>
              </span>
            </Link>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              Coaching online especializado en mujeres +35.<br />
              Vive más joven por más tiempo.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h5 className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-white/30 mb-5">
              Navegación
            </h5>
            <ul className="space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-white/30 mb-5">
              Contacto
            </h5>
            <ul className="space-y-3">
              {contact.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 tracking-wide">
            © 2026 Mi Vida en Forma · Todos los derechos reservados
          </p>
          <Link
            href="https://www.instagram.com/mivida_enforma/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white/[0.06] hover:bg-green-mid px-4 py-2 rounded-full text-white/55 hover:text-white text-xs font-medium transition-all duration-300 group"
            aria-label="Instagram"
          >
            <IconInstagram className="w-4 h-4" />
            @mivida_enforma
          </Link>
        </div>
      </div>
    </footer>
  )
}
