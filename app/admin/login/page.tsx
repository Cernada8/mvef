import Image from 'next/image'
import { loginAction } from '../actions'

export const metadata = { title: 'Admin · Mi Vida en Forma', robots: { index: false } }

export default function AdminLogin({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const hasError = searchParams.error === '1'

  return (
    <div className="min-h-screen bg-[#0b120f] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-dark/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-green-dark/20 border border-green-mid/20 flex items-center justify-center mb-4">
            <Image src="/logo-mvef.png" alt="Logo" width={32} height={32} />
          </div>
          <h1 className="font-serif text-white text-xl font-bold">Mi Vida en Forma</h1>
          <p className="text-white/30 text-xs tracking-widest uppercase mt-1">Panel de administración</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-white font-semibold text-base mb-1">Bienvenida, Yerlina</h2>
          <p className="text-white/40 text-sm mb-6">Introduce la contraseña para continuar.</p>

          {hasError && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              Contraseña incorrecta. Inténtalo de nuevo.
            </div>
          )}

          <form action={loginAction} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-xs text-white/40 mb-2 tracking-wide uppercase">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                placeholder="••••••••"
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-green-mid/50 focus:bg-white/[0.08] transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-dark hover:bg-green-mid text-white font-semibold py-3 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-dark/20 hover:-translate-y-0.5"
            >
              Entrar al dashboard
            </button>
          </form>
        </div>

        <p className="text-center text-white/15 text-xs mt-6">
          Solo acceso autorizado
        </p>
      </div>
    </div>
  )
}
