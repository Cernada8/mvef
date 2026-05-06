import { NextRequest, NextResponse } from 'next/server'

// ─── Mailchimp subscribe endpoint ────────────────────────────────────────────
// Variables de entorno necesarias (añade en Vercel → Settings → Environment Variables):
//   MAILCHIMP_API_KEY      → tu API key (Account → Extras → API Keys)
//   MAILCHIMP_LIST_ID      → ID de la audiencia (Audience → Settings → Audience name and defaults)
//   MAILCHIMP_SERVER_PREFIX → el prefijo del servidor, ej. "us21" (aparece en la URL al entrar al dashboard)
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Nombre y email son obligatorios.' }, { status: 400 })
    }

    const API_KEY  = process.env.MAILCHIMP_API_KEY
    const LIST_ID  = process.env.MAILCHIMP_LIST_ID
    const SERVER   = process.env.MAILCHIMP_SERVER_PREFIX

    if (!API_KEY || !LIST_ID || !SERVER) {
      console.error('Mailchimp env vars not set')
      return NextResponse.json({ error: 'Configuración de email no disponible.' }, { status: 500 })
    }

    const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: { FNAME: name },
        tags: ['guia-gratis', 'descuento-bienvenida'],
      }),
    })

    const data = await response.json()

    // Si ya estaba suscrita, lo tratamos como éxito
    if (!response.ok && data.title !== 'Member Exists') {
      return NextResponse.json({ error: data.detail || 'Error al suscribirse.' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
