'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '#metodo',     label: 'Mi método' },
  { href: '#programas',  label: 'Programas' },
  { href: '#resultados', label: 'Resultados'},
  { href: '#sobre-mi',   label: 'Sobre mí'  },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white shadow-sm py-3'
            : 'bg-white/90 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="#inicio" className="flex items-center gap-3 group">
            <Image src="/logo-mvef.png" alt="Logo Mi Vida en Forma — Coaching online con Yerlina" width={56} height={56} priority />
            <span className="font-serif font-bold text-ink-dark leading-tight hidden sm:block">
              Mi Vida en Forma
              <span className="block font-sans font-normal text-[0.62rem] tracking-widest uppercase text-ink-light">
                Con Yerlina
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-ink-mid hover:text-green-dark transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-mid group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="#contacto"
              className="hidden sm:inline-flex items-center gap-2 bg-green-dark hover:bg-green-mid text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              Empieza hoy →
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex flex-col gap-1.5 p-1"
              aria-label="Abrir menú"
            >
              <span className="block w-6 h-0.5 bg-ink-dark rounded" />
              <span className="block w-6 h-0.5 bg-ink-dark rounded" />
              <span className="block w-6 h-0.5 bg-ink-dark rounded" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8">
          <button
            onClick={close}
            className="absolute top-6 right-6 w-11 h-11 bg-green-pale rounded-full flex items-center justify-center text-ink-dark text-lg"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="font-serif text-3xl text-ink-dark hover:text-green-mid transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            onClick={close}
            className="bg-green-dark text-white font-semibold px-8 py-3.5 rounded-full text-lg hover:bg-green-mid transition-colors"
          >
            Empieza hoy →
          </Link>
        </div>
      )}
    </>
  )
}
