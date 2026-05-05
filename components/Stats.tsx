'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 800, prefix: '+', suffix: '',  label: 'Mujeres transformadas'  },
  { value: 20,  prefix: '+', suffix: '',  label: 'Años de experiencia'    },
  { value: 100, prefix: '',  suffix: '%', label: 'Personalizado para ti'  },
  { value: 360, prefix: '',  suffix: '°', label: 'Cuerpo, mente y hábitos'},
]

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref     = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const dur   = 1800
          const start = performance.now()
          const run   = (t: number) => {
            const p     = Math.min((t - start) / dur, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(eased * value))
            if (p < 1) requestAnimationFrame(run)
          }
          requestAnimationFrame(run)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

export default function Stats() {
  return (
    <div className="bg-green-dark py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center ${i < 3 ? 'lg:border-r border-white/10' : ''}`}
            >
              <div className="font-serif text-[2.2rem] lg:text-[2.6rem] font-bold text-white leading-none mb-2 tabular-nums">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="text-xs text-white/55 tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
