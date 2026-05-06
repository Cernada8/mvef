import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// ─── Stripe checkout session ──────────────────────────────────────────────────
// Variables de entorno necesarias (añade en Vercel → Settings → Environment Variables):
//   STRIPE_SECRET_KEY  → tu clave secreta de Stripe (Developers → API Keys → Secret key)
//   NEXT_PUBLIC_URL    → la URL pública de tu web, ej. "https://www.mvf.coach"
//
// Pasos:
//   1. Crea los productos en Stripe Dashboard → Products → Add product
//   2. Copia el Price ID de cada producto (empieza por "price_")
//   3. Pégalo en el array `products` de components/Shop.tsx
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json()

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
    })

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID requerido.' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.mvf.coach'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/#tienda`,
      locale: 'es',
      payment_method_types: ['card'],
      allow_promotion_codes: true, // permite que el cliente use BIENVENIDA10
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: 'Error al crear la sesión de pago.' }, { status: 500 })
  }
}
