import { NextRequest, NextResponse } from 'next/server'

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/bpGBWdswRdohsRPKsY45/webhook-trigger/41b56366-75a9-4c9f-8908-f2d1aa0f06f3'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { nombre, email, telefono, pais, instagram, edad, objetivo, bloqueo, mensaje, inversion } = body

    // Validación básica
    if (!nombre || !email) {
      return NextResponse.json({ error: 'Nombre y email son obligatorios' }, { status: 400 })
    }

    // Split nombre en first/last para GHL
    const parts = (nombre as string).trim().split(' ')
    const firstName = parts[0] ?? ''
    const lastName  = parts.slice(1).join(' ') ?? ''

    // Payload para GoHighLevel
    const ghlPayload = {
      firstName,
      lastName,
      email,
      phone:   telefono ? `+34${(telefono as string).replace(/\D/g, '')}` : '',
      country: pais ?? 'España',
      // Campos custom que GHL mapea como custom fields
      edad,
      objetivo,
      bloqueo,
      mensaje,
      inversion,
      instagram: instagram ? `@${(instagram as string).replace('@', '')}` : '',
      source:    'Web mividaenforma.com',
      tags:      ['web-lead', 'full-glow'],
    }

    const ghlRes = await fetch(GHL_WEBHOOK, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(ghlPayload),
    })

    const ghlData = await ghlRes.json().catch(() => ({}))

    if (!ghlRes.ok) {
      console.error('GHL webhook error:', ghlData)
      // No bloqueamos al usuario por un error del CRM
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
