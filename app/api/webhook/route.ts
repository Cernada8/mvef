// ─── Stripe Webhook ───────────────────────────────────────────────────────────
// Este endpoint recibe los eventos de Stripe (pago completado, reembolso…)
// y actualiza la base de datos en consecuencia.
//
// Configuración en Stripe Dashboard:
//   Developers → Webhooks → Add endpoint
//   URL: https://www.mvf.coach/api/webhook
//   Eventos a escuchar:
//     · checkout.session.completed
//     · charge.dispute.created   (por si acaso)
//
// Variable de entorno necesaria:
//   STRIPE_WEBHOOK_SECRET → aparece al crear el endpoint en Stripe
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

// Next.js necesita el body raw para verificar la firma de Stripe
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature') ?? ''

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  })

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Firma inválida.' }, { status: 400 })
  }

  // ── Pago completado ─────────────────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email ?? ''
    const customerName  = session.customer_details?.name  ?? ''
    const discountCode  = session.total_details?.breakdown?.discounts?.[0]
                            ?.discount?.promotion_code?.toString() ?? null

    // Calcular expiración del enlace de descarga (30 días)
    const downloadExpiresAt = new Date()
    downloadExpiresAt.setDate(downloadExpiresAt.getDate() + 30)

    await prisma.order.update({
      where: { stripeSessionId: session.id },
      data: {
        customerEmail,
        customerName,
        stripePaymentIntentId: session.payment_intent as string,
        status:                'COMPLETED',
        discountCode,
        downloadExpiresAt,
      },
    })

    console.log(`✅ Pedido completado: ${customerEmail}`)
  }

  // ── Reembolso ───────────────────────────────────────────────────────────────
  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge
    await prisma.order.updateMany({
      where: { stripePaymentIntentId: charge.payment_intent as string },
      data:  { status: 'REFUNDED' },
    })
  }

  return NextResponse.json({ received: true })
}
