import { prisma } from '@/lib/prisma'
import { logoutAction } from './actions'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'Dashboard · Mi Vida en Forma', robots: { index: false } }
export const dynamic = 'force-dynamic'

async function getStats() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfWeek  = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const [
    totalSubscribers,
    newThisMonth,
    newThisWeek,
    recentSubscribers,
    totalRevenue,
    completedOrders,
    pendingOrders,
    recentOrders,
    topProducts,
  ] = await Promise.all([
    prisma.subscriber.count(),
    prisma.subscriber.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.subscriber.count({ where: { createdAt: { gte: startOfWeek  } } }),
    prisma.subscriber.findMany({
      take: 7,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, source: true, createdAt: true },
    }),
    prisma.order.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amountPaid: true },
    }),
    prisma.order.count({ where: { status: 'COMPLETED' } }),
    prisma.order.count({ where: { status: 'PENDING'   } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      where: { status: 'COMPLETED' },
      include: { product: { select: { name: true } } },
    }),
    prisma.product.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, name: true, price: true, featured: true },
    }),
  ])

  return {
    totalSubscribers,
    newThisMonth,
    newThisWeek,
    recentSubscribers,
    revenueEur: ((totalRevenue._sum.amountPaid ?? 0) / 100).toFixed(2),
    completedOrders,
    pendingOrders,
    recentOrders,
    topProducts,
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(date))
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className="min-h-screen bg-[#0b120f] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-green-dark/8 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-green-mid/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06] bg-[#0b120f]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-green-dark/20 border border-green-mid/20 flex items-center justify-center">
              <Image src="/logo-mvef.png" alt="Logo" width={18} height={18} />
            </div>
            <div>
              <span className="font-serif font-bold text-white text-sm">Mi Vida en Forma</span>
              <span className="hidden sm:inline text-white/30 text-xs ml-2 tracking-widest uppercase">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-white/40 hover:text-white/70 text-xs transition-colors hidden sm:block"
            >
              Ver web →
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs text-white/30 hover:text-white/60 border border-white/[0.08] hover:border-white/20 px-3 py-1.5 rounded-lg transition-all"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
            Hola, Yerlina
          </h1>
          <p className="text-white/35 text-sm">
            {new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">

          {/* 1. Total suscriptoras — large hero card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-green-dark/20 to-green-mid/5 border border-green-mid/20 rounded-2xl p-7 flex flex-col justify-between min-h-[160px] relative overflow-hidden group hover:border-green-mid/35 transition-all duration-300">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-green-mid/5 blur-2xl group-hover:bg-green-mid/10 transition-all duration-500" />
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-green-mid/70 mb-3">Total suscriptoras</p>
              <p className="font-serif text-6xl sm:text-7xl font-bold text-white leading-none tabular-nums">
                {stats.totalSubscribers.toLocaleString('es-ES')}
              </p>
            </div>
            <p className="text-white/30 text-xs mt-4">Mujeres que confiaron en tu guía gratuita</p>
          </div>

          {/* 2. Nuevas este mes */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/30 mb-3">Este mes</p>
            <div>
              <p className="font-serif text-5xl font-bold text-white leading-none tabular-nums">
                +{stats.newThisMonth}
              </p>
              <p className="text-white/30 text-xs mt-2">suscriptoras nuevas</p>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-mid" />
              <span className="text-green-mid text-xs">Este mes</span>
            </div>
          </div>

          {/* 3. Esta semana */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/30 mb-3">Esta semana</p>
            <div>
              <p className="font-serif text-5xl font-bold text-white leading-none tabular-nums">
                +{stats.newThisWeek}
              </p>
              <p className="text-white/30 text-xs mt-2">suscriptoras nuevas</p>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
              <span className="text-white/30 text-xs">Últimos 7 días</span>
            </div>
          </div>

          {/* 4. Ingresos */}
          <div className="bg-gradient-to-br from-amber-900/20 to-amber-700/5 border border-amber-500/15 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-amber-500/25 transition-all duration-300">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-amber-500/50 mb-3">Ingresos totales</p>
            <div>
              <p className="font-serif text-4xl sm:text-5xl font-bold text-amber-400 leading-none tabular-nums">
                {Number(stats.revenueEur).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}€
              </p>
              <p className="text-amber-500/40 text-xs mt-2">de pedidos completados</p>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-amber-500/50 text-xs">{stats.completedOrders} pedido{stats.completedOrders !== 1 ? 's' : ''} completado{stats.completedOrders !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* 5. Pedidos pendientes */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/30 mb-3">Pedidos pendientes</p>
            <div>
              <p className="font-serif text-5xl font-bold text-white leading-none tabular-nums">
                {stats.pendingOrders}
              </p>
              <p className="text-white/30 text-xs mt-2">en proceso</p>
            </div>
            {stats.pendingOrders > 0 && (
              <div className="flex items-center gap-1.5 mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-yellow-400/70 text-xs">Revisar en Stripe</span>
              </div>
            )}
          </div>

          {/* 6. Últimas suscriptoras — tall, spans 2 cols */}
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.12] transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/30">Últimas suscriptoras</p>
              <span className="text-white/20 text-xs">{stats.totalSubscribers} total</span>
            </div>
            <div className="space-y-3">
              {stats.recentSubscribers.length === 0 ? (
                <p className="text-white/20 text-sm">Aún no hay suscriptoras.</p>
              ) : (
                stats.recentSubscribers.map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-3 py-2 border-b border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-green-dark/30 border border-green-mid/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-mid text-[0.6rem] font-bold">
                          {s.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/80 text-xs font-medium truncate">{s.name}</p>
                        <p className="text-white/25 text-[0.65rem] truncate">{s.email}</p>
                      </div>
                    </div>
                    <span className="text-white/20 text-[0.6rem] flex-shrink-0">{formatDate(s.createdAt)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 7. Últimos pedidos */}
          <div className="sm:col-span-2 lg:col-span-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.12] transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/30">Últimos pedidos</p>
              <span className="w-1.5 h-1.5 rounded-full bg-green-mid" />
            </div>
            <div className="space-y-3">
              {stats.recentOrders.length === 0 ? (
                <p className="text-white/20 text-sm">Aún no hay pedidos completados.</p>
              ) : (
                stats.recentOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between gap-3 py-2 border-b border-white/[0.04] last:border-0">
                    <div className="min-w-0">
                      <p className="text-white/70 text-xs font-medium truncate">{o.customerEmail}</p>
                      <p className="text-white/25 text-[0.65rem] truncate">{o.product.name}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-green-mid text-xs font-semibold">{(o.amountPaid / 100).toFixed(0)}€</p>
                      <p className="text-white/20 text-[0.6rem]">{formatTime(o.createdAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 8. Productos activos */}
          <div className="sm:col-span-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.12] transition-all duration-300">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/30 mb-5">Productos activos</p>
            <div className="space-y-3">
              {stats.topProducts.length === 0 ? (
                <p className="text-white/20 text-sm">No hay productos activos.</p>
              ) : (
                stats.topProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {p.featured && (
                        <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      )}
                      <p className="text-white/70 text-xs truncate">{p.name}</p>
                    </div>
                    <span className="text-white/40 text-xs flex-shrink-0 font-mono">{(p.price / 100).toFixed(0)}€</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 9. Bot — próximamente */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between min-h-[140px]">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/20 mb-3">Bot conversaciones</p>
            <div>
              <p className="font-serif text-4xl font-bold text-white/20 leading-none">—</p>
              <p className="text-white/15 text-xs mt-2">Próximamente</p>
            </div>
          </div>

          {/* 10. Analytics link — accent card */}
          <div className="bg-gradient-to-br from-green-dark/15 to-transparent border border-green-mid/10 rounded-2xl p-6 flex flex-col justify-between min-h-[140px] group hover:border-green-mid/25 hover:from-green-dark/25 transition-all duration-300">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-green-mid/40 mb-3">Google Analytics</p>
            <div>
              <p className="text-white/50 text-sm leading-relaxed">Visitas, sesiones, tráfico y comportamiento en tiempo real.</p>
            </div>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-green-mid/60 hover:text-green-mid text-xs mt-4 transition-colors group-hover:gap-2.5"
            >
              Abrir GA4
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
          </div>

          {/* 11. MailerLite link */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between min-h-[140px] group hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/20 mb-3">Email Marketing</p>
            <div>
              <p className="text-white/30 text-sm leading-relaxed">Campañas, automatizaciones y listas de MailerLite.</p>
            </div>
            <a
              href="https://dashboard.mailerlite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/50 text-xs mt-4 transition-colors"
            >
              Abrir MailerLite →
            </a>
          </div>

          {/* 12. Stripe link */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between min-h-[140px] group hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/20 mb-3">Pagos Stripe</p>
            <div>
              <p className="text-white/30 text-sm leading-relaxed">Pagos, facturas y gestión de clientes en Stripe.</p>
            </div>
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/50 text-xs mt-4 transition-colors"
            >
              Abrir Stripe →
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/[0.04] flex items-center justify-between">
          <p className="text-white/15 text-xs">Mi Vida en Forma &copy; 2026</p>
          <p className="text-white/10 text-xs">Solo visible para ti</p>
        </div>
      </main>
    </div>
  )
}
