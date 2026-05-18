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

    // ── 1. Guardar en base de datos ──────────────────────────────────────────
    await prisma.subscriber.upsert({
      where:  { email: cleanEmail },
      update: { name: cleanName },
      create: { name: cleanName, email: cleanEmail, source: 'lead-magnet' },
    })

    // ── 2. Enviar a MailerLite ───────────────────────────────────────────────
    const API_KEY  = process.env.MAILERLITE_API_KEY
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID

    if (API_KEY) {
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
        const err = await mlRes.json()
        console.warn('MailerLite warning:', err)
      }
    } else {
      console.warn('MAILERLITE_API_KEY not set — skipping MailerLite sync')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
