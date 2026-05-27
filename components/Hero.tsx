'use client'

import Image from 'next/image'
import Link  from 'next/link'
import AnimatedSection from './AnimatedSection'
import { IconArrow, IconTrophy, IconSparkle } from './Icons'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="bg-gradient-to-br from-green-xpale via-warm to-beige-light relative overflow-hidden flex flex-col h-[100svh] md:h-auto md:min-h-screen md:flex-row md:items-center"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-green-mid/[0.05]" />
      <div className="pointer-events-none absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-beige/[0.10]" />

      {/* ──────────────────────────────────────────────
          MOBILE LAYOUT  (oculto en md+)
          Ocupa 100svh repartiendo espacio entre secciones
      ────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col h-full pt-[72px] px-5 pb-5 relative z-10">

        {/* Badge */}
        <AnimatedSection className="mb-3 flex-shrink-0">
          <div className="inline-flex items-center gap-2 border border-green-mid/25 text-green-dark text-[0.65rem] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-mid" />
            Coaching Online · Mujeres +35
          </div>
        </AnimatedSection>

        {/* ── Imagen + Titular ── flex-1 para que la foto ocupe todo el espacio disponible */}
        <AnimatedSection delay={50} className="flex gap-4 flex-1 min-h-0 mb-3">

          {/* Foto — crece en altura con el contenedor */}
          <div className="relative w-[70%] flex-shrink-0 self-stretch">
            <div className="w-full h-full rounded-[1.6rem] overflow-hidden relative shadow-lg">
              <Image
                src="/foto-yerlina-principal.png"
                alt="Yerlina, coach online de nutrición y entrenamiento para mujeres +35 y +40"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 70vw, 420px"
                priority
              />
            </div>

            {/* Float mini-card — encima de la foto */}
            <div className="absolute -bottom-2 -right-2 bg-white rounded-xl p-1.5 shadow-md flex items-center gap-1.5 border border-ink-dark/[0.05]">
              <div className="w-5 h-5 bg-green-pale rounded-lg flex items-center justify-center">
                <IconTrophy className="w-3 h-3 text-green-dark" />
              </div>
              <p className="text-[0.58rem] font-bold text-ink-dark leading-tight pr-1">Método 360°</p>
            </div>

            {/* Float mini-card — arriba de la foto */}
            <div className="absolute -top-2 -left-2 bg-white rounded-xl p-1.5 shadow-md flex items-center gap-1.5 border border-ink-dark/[0.05]">
              <div className="w-5 h-5 bg-green-pale rounded-lg flex items-center justify-center">
                <IconSparkle className="w-3 h-3 text-green-dark" />
              </div>
              <p className="text-[0.58rem] font-bold text-ink-dark leading-tight pr-1">+20 años exp.</p>
            </div>
          </div>

          {/* Titular + subtítulo — centrado verticalmente */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="font-serif font-bold text-ink-dark leading-[1.1] text-[1.45rem]">
              <em className="not-italic text-green-mid">Vive más joven</em>
              <br />por más tiempo.
            </h1>
          </div>
        </AnimatedSection>

        {/* ── Guía Gratis — spotlight ── */}
        <AnimatedSection delay={100} className="mb-3 flex-shrink-0">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/40 via-green-mid/30 to-gold/40 hero-glow-border" />
            <div className="relative bg-gradient-to-br from-amber-50 to-green-xpale border-2 border-gold/50 rounded-2xl px-4 py-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                </span>
                <p className="text-[0.65rem] font-black text-gold uppercase tracking-widest">
                  🎁 Regalo gratuito · Mujeres +40
                </p>
              </div>
              <p className="text-[0.83rem] font-semibold text-ink-dark leading-snug">
                Descarga mi guía y empieza a mejorar tu cuerpo, energía y hábitos{' '}
                <strong className="text-green-dark font-black">desde hoy</strong>.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ── CTA Botón ── */}
        <AnimatedSection delay={130} className="flex-shrink-0">
          <Link
            href="#guia-gratis"
            className="group relative w-full flex items-center justify-center gap-2.5 bg-green-dark text-white font-bold px-6 py-[14px] rounded-full text-[0.95rem] tracking-wide transition-all duration-300 hover:bg-green-mid hover:-translate-y-0.5 hover:shadow-lg overflow-hidden mb-2.5 hero-btn-shimmer"
          >
            <span>🎁 Quiero mi guía gratis</span>
            <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="#contacto"
            className="inline-flex items-center justify-center gap-1.5 text-green-dark hover:text-green-mid font-medium text-[0.8rem] transition-colors duration-200 w-full group mb-3"
          >
            Quiero mi transformación
            <IconArrow className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>

        {/* ── Social proof ── */}
        <AnimatedSection delay={160} className="flex items-center gap-3 pt-3 border-t border-ink-dark/[0.08] flex-shrink-0">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-green-pale to-beige-light overflow-hidden">
                <svg className="w-full h-full text-green-mid/60" viewBox="0 0 36 36" fill="currentColor">
                  <circle cx="18" cy="14" r="6"/>
                  <ellipse cx="18" cy="30" rx="11" ry="8"/>
                </svg>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[0.78rem] font-semibold text-ink-dark">+288.000 seguidoras en Instagram</p>
            <p className="text-[0.65rem] text-ink-light mt-0.5">Mujeres que ya han cambiado su vida</p>
          </div>
        </AnimatedSection>

      </div>

      {/* ──────────────────────────────────────────────
          DESKTOP LAYOUT  (oculto en mobile)
      ────────────────────────────────────────────── */}
      <div className="hidden md:block w-full">
        <div className="max-w-6xl mx-auto px-8 py-16 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Content */}
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 border border-green-mid/25 text-green-dark text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-mid" />
                Coaching Online · Mujeres +35
              </div>

              <h1 className="font-serif font-bold text-ink-dark mb-6 leading-[1.05] text-5xl lg:text-6xl xl:text-7xl">
                <em className="not-italic text-green-mid">Vive más joven</em>
                <br />por más tiempo.
              </h1>

              <p className="text-ink-mid leading-relaxed mb-8 max-w-md text-[1.05rem]">
                Pierde grasa, reduce la inflamación y recupera tu energía con un método
                sostenible — sin dietas extremas, sin horas interminables en el gym.
              </p>

              {/* Guía gratis spotlight — desktop */}
              <div className="relative mb-7 max-w-md">
                <div className="absolute -inset-[3px] rounded-[1.2rem] bg-gradient-to-r from-gold/50 via-green-mid/30 to-gold/50 hero-glow-border" />
                <div className="relative bg-gradient-to-br from-amber-50/90 to-green-xpale border-2 border-gold/60 rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                    </span>
                    <p className="text-[0.7rem] font-black text-gold uppercase tracking-widest">
                      🎁 Regalo gratuito · Mujeres +40
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-ink-dark leading-snug">
                    Descarga gratis mi guía y empieza a mejorar tu cuerpo,
                    energía y hábitos{' '}
                    <strong className="text-green-dark font-black">desde hoy</strong>.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
                <Link
                  href="#guia-gratis"
                  className="group relative inline-flex items-center gap-2.5 bg-green-dark hover:bg-green-mid text-white font-bold px-8 py-4 rounded-full text-[0.95rem] tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden hero-btn-shimmer"
                >
                  <span>🎁 Quiero mi guía gratis</span>
                  <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-green-dark hover:text-green-mid font-medium text-sm transition-colors duration-200 group"
                >
                  Quiero mi transformación
                  <IconArrow className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 pt-8 border-t border-ink-dark/[0.08]">
                <div className="flex -space-x-2.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-green-pale to-beige-light overflow-hidden">
                      <svg className="w-full h-full text-green-mid/60" viewBox="0 0 36 36" fill="currentColor">
                        <circle cx="18" cy="14" r="6"/>
                        <ellipse cx="18" cy="30" rx="11" ry="8"/>
                      </svg>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-dark">+288.000 seguidoras en Instagram</p>
                  <p className="text-xs text-ink-light mt-0.5">Mujeres que ya han cambiado su vida</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Foto desktop */}
            <AnimatedSection delay={150} className="flex justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">
                <div className="w-full aspect-[3/4] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden relative">
                  <Image
                    src="/foto-yerlina-principal.png"
                    alt="Yerlina, coach online de nutrición y entrenamiento para mujeres +35 y +40"
                    fill
                    className="object-cover object-center hover:scale-[1.03] transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 380px, 420px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-5 bg-white rounded-2xl p-3 sm:p-4 shadow-lg flex items-center gap-2.5 sm:gap-3 border border-ink-dark/[0.05] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-pale rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconTrophy className="w-4 h-4 sm:w-5 sm:h-5 text-green-dark" />
                  </div>
                  <div>
                    <p className="text-[0.75rem] sm:text-[0.8rem] font-semibold text-ink-dark leading-tight">Método 360°</p>
                    <p className="text-[0.65rem] sm:text-[0.7rem] text-ink-light">Cuerpo · Mente · Hábitos</p>
                  </div>
                </div>
                <div className="absolute -top-4 -left-3 sm:-top-5 sm:-left-5 bg-white rounded-2xl p-3 sm:p-4 shadow-lg flex items-center gap-2.5 sm:gap-3 border border-ink-dark/[0.05] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-pale rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconSparkle className="w-4 h-4 sm:w-5 sm:h-5 text-green-dark" />
                  </div>
                  <div>
                    <p className="text-[0.75rem] sm:text-[0.8rem] font-semibold text-ink-dark leading-tight">+20 años</p>
                    <p className="text-[0.65rem] sm:text-[0.7rem] text-ink-light">de experiencia</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </div>

    </section>
  )
}
      