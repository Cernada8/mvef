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

    if (API_KEY && GROUP_ID) {
      const headers = {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept':        'application/json',
      }

      // ── Paso 1: Crear/actualizar suscriptora (sin grupo todavía) ────────────
      const createRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email:  cleanEmail,
          fields: { name: cleanName },
          status: 'active',
        }),
      })
      const createData = await createRes.json().catch(() => ({}))
      const subscriberId = createData?.data?.id
      console.log('[MailerLite] Subscriber upserted. ID:', subscriberId)

      if (subscriberId) {
        // ── Paso 2: Sacar del grupo (si ya estaba) para que la automatización vuelva a dispararse
        await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${GROUP_ID}`, {
          method: 'DELETE',
          headers,
        })

        // ── Paso 3: Volver a añadir al grupo → dispara "subscriber joins group" siempre
        const addRes = await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${GROUP_ID}`, {
          method: 'POST',
          headers,
        })
        if (addRes.ok) {
          console.log('[MailerLite] Added to group OK — automation will fire')
        } else {
          const err = await addRes.json().catch(() => ({}))
          console.error('[MailerLite] Error adding to group:', err)
        }
      }
    } else {
      console.error('[MailerLite] API_KEY or GROUP_ID not set — skipping sync')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
