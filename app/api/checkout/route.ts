import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID requerido.' }, { status: 400 })
    }

    // Verificar que el producto existe y está activo en nuestra DB
    const product = await prisma.product.findFirst({
      where: { stripePriceId: priceId, active: true },
    })

    if (!product) {
      return NextResponse.json({ error: 'Producto no disponible.' }, { status: 404 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
    })

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.mvf.coach'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/#tienda`,
      locale: 'es',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      metadata: { productId: product.id }, // lo usamos en el webhook
    })

    // Crear el pedido en estado PENDING
    await prisma.order.create({
      data: {
        productId:       product.id,
        customerEmail:   '', // se rellena en el webhook cuando Stripe confirma
        stripeSessionId: session.id,
        amountPaid:      product.price,
        currency:        product.currency,
        status:          'PENDING',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Error al crear la sesión de pago.' }, { status: 500 })
  }
}
