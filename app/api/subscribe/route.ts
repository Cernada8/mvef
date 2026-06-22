import { NextRequest, NextResponse } from 'next/server'

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/bpGBWdswRdohsRPKsY45/webhook-trigger/fa767fd5-9d89-4f2e-ab1f-6aedf22cae29'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Nombre y email son obligatorios.' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName  = name.trim()

    const ghlRes = await fetch(GHL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, email: cleanEmail }),
    })

    if (!ghlRes.ok) {
      console.error('[GHL] Webhook error:', ghlRes.status, await ghlRes.text().catch(() => ''))
      return NextResponse.json({ error: 'Error enviando datos.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Subscribe] Error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
