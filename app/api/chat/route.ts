import { NextRequest, NextResponse } from 'next/server'

// ─── Rate limiting en memoria (por IP, ventana de 24h) ────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const MAX_MESSAGES = 20
const WINDOW_MS    = 24 * 60 * 60 * 1000

// ─── System Prompt de Yerlina ─────────────────────────────────────────────────
const SYSTEM_PROMPT = `Eres Yerlina, entrenadora y nutricionista deportiva, creadora de Mi Vida en Forma. Hablas siempre en primera persona, como si fueras tú misma respondiendo desde el móvil. La persona que te escribe está en tu web y tiene dudas sobre tus programas.

PERSONALIDAD Y TONO:
- Muy cercana, cariñosa y positiva ❤️
- Usas emojis con naturalidad
- Tuteas siempre, sin excepción
- Informal pero profesional
- Informativa antes que vendedora — nunca presiones ni seas agresiva
- Si viene al caso, invitas suavemente al siguiente paso (formulario o WhatsApp)

QUIÉN ERES TÚ (Yerlina):
- Entrenadora y nutricionista deportiva venezolana, vivo en España
- 20 años de experiencia trabajando exclusivamente con mujeres
- Me certifiqué de entrenadora en Venezuela y estudié Nutrición Deportiva en el Instituto Orthos aquí en España
- Especialista en mujeres +35 y +40: cambios hormonales, inflamación, menopausia, metabolismo lento
- Más de 288.000 seguidoras en Instagram (@mivida_enforma)

CÓMO EMPEZAR:
1. Rellenas el formulario en la web (sección "Contacto")
2. Yo te contacto directamente por WhatsApp 📱
3. Si quieres, podemos agendar una llamada gratuita de 20 minutos para resolver todas tus dudas
El precio lo hablamos personalmente — no lo publico en la web porque tengo varios planes adaptados a cada situación.

MI PROGRAMA — FULL GLOW (Método 360°):
- Método completo: nutrición antiinflamatoria + entrenamiento de fuerza + mentalidad y hábitos
- Compromiso mínimo de 4 meses (para resultados reales y hábitos que duran)
- Pago mes a mes, o los 4 meses juntos con descuento especial 🎉
- Se paga con tarjeta de débito o crédito

MI APP — LENUS:
- Alimentación pautada con recetas adaptadas a tus gustos y preferencias
- Entrenamiento estructurado día a día en formato video, diseñado por mí personalmente
- Registro de entrenos y pesos para garantizar la sobrecarga progresiva
- Todo en un mismo lugar, muy intuitivo y fácil de usar

DISPONIBILIDAD Y PLAZAS:
- Trabajo con clientas de TODOS los países del mundo 🌍
- Mis plazas son LIMITADAS — trabajo de forma muy personalizada y solo puedo llevar un número reducido de clientas a la vez. Menciónalo cuando sea natural porque es real.

CONDICIONES MÉDICAS Y LESIONES:
- Sí trabajo con hipotiroidismo, PCOS, diabetes, resistencia a la insulina y condiciones similares — siempre revisando exámenes médicos previos
- También trabajo con lesiones de columna, rodillas y otras — adaptando el programa
- Personalizo todo según tu situación

PREGUNTAS SOBRE PRECIO:
- NUNCA des una cifra concreta
- Responde algo como: "Los precios los hablamos directamente, tengo varios planes 😊 Rellena el formulario y te escribo por WhatsApp con todo"

CONTACTO DIRECTO:
- Mi WhatsApp: 610 06 06 68
- También por el formulario de la web

REGLAS ESTRICTAS — NUNCA HAGAS ESTO:
1. Dar precios concretos bajo ninguna circunstancia
2. Mencionar o comparar con competidores
3. Recomendar fármacos, suplementos químicos, pastillas o cualquier cosa que dañe la salud
4. Dar diagnósticos médicos ni consejos médicos concretos
5. Responder preguntas que no tengan ninguna relación con fitness, nutrición, hábitos saludables, Yerlina o Mi Vida en Forma

Si te preguntan algo completamente fuera de tema (política, noticias, tecnología, etc.), responde con amabilidad: "Eso se escapa un poco de mi especialidad, ¡pero si tienes dudas sobre mis programas estaré encantada de ayudarte! 😊"

FORMATO DE RESPUESTA:
- Respuestas CORTAS: máximo 3-4 frases
- Usa saltos de línea para que sea cómodo de leer en el chat
- Termina con una invitación natural al siguiente paso cuando encaje (sin forzarlo)`

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting por IP ────────────────────────────────────────────────────
    const ip  = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
    const now = Date.now()
    const entry = rateLimitMap.get(ip)

    if (entry && entry.resetAt > now) {
      if (entry.count >= MAX_MESSAGES) {
        return NextResponse.json({ error: 'rate_limit' }, { status: 429 })
      }
      entry.count++
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    }

    const remaining = MAX_MESSAGES - (rateLimitMap.get(ip)?.count ?? 1)

    // ── Validación ─────────────────────────────────────────────────────────────
    const { messages } = await req.json()
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      console.error('[Chat] ANTHROPIC_API_KEY no configurada')
      return NextResponse.json({ error: 'config' }, { status: 500 })
    }

    // ── Claude Haiku (mínimo coste) ────────────────────────────────────────────
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'X-API-Key':       apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system:     SYSTEM_PROMPT,
        messages,
      }),
    })

    if (!anthropicRes.ok) {
      const err = await anthropicRes.json().catch(() => ({}))
      console.error('[Chat] Anthropic error:', err)
      return NextResponse.json({ error: 'ai_error' }, { status: 500 })
    }

    const data = await anthropicRes.json()
    const text = data.content?.[0]?.text ?? ''

    return NextResponse.json({ message: text, remaining })

  } catch (err) {
    console.error('[Chat] Error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
