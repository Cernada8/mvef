import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// ─── MailerLite subscribe endpoint ───────────────────────────────────────────
// Variables de entorno necesarias:
//   MAILERLITE_API_KEY  → MailerLite → Integrations → API → API Keys → Create
//   MAILERLITE_GROUP_ID → MailerLite → Subscribers → Groups → tu grupo → ID en la URL
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Nombre y email son obligatorios.' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName  = name.trim()

    // ── 1. Guardar en base de datos (opcional — no bloquea el flujo) ─────────
    try {
      await prisma.subscriber.upsert({
        where:  { email: cleanEmail },
        update: { name: cleanName },
        create: { name: cleanName, email: cleanEmail, source: 'lead-magnet' },
      })
    } catch (dbErr) {
      console.error('[DB] Error saving subscriber (non-fatal):', dbErr)
    }

    // ── 2. Enviar a MailerLite ───────────────────────────────────────────────
    const API_KEY  = process.env.MAILERLITE_API_KEY
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID

    if (API_KEY) {
      console.log('[MailerLite] Sending subscriber to group:', GROUP_ID)

      // Crear/actualizar suscriptora
      const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Accept':        'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          fields: { name: cleanName },
          groups: GROUP_ID ? [GROUP_ID] : [],
          status: 'active',
        }),
      })

      if (!mlRes.ok) {
        const errBody = await mlRes.json().catch(() => ({}))
        console.error('[MailerLite] Error:', mlRes.status, JSON.stringify(errBody))
        // No bloqueamos la respuesta al usuario, pero sí lo registramos claramente
      } else {
        const data = await mlRes.json().catch(() => ({}))
        console.log('[MailerLite] Subscriber synced OK. ID:', data?.data?.id)
      }
    } else {
      console.error('[MailerLite] MAILERLITE_API_KEY not set — skipping sync')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
