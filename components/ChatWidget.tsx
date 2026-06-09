'use client'

import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const MAX_MSGS   = 20
const STORE_KEY  = 'mvef_chat_used'

// ─── Iconos ────────────────────────────────────────────────────────────────────
const IconChat = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
  </svg>
)
const IconClose = () => (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
)
const IconSend = () => (
  <svg className="w-3.5 h-3.5 text-white translate-x-px" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
)
const IconAvatar = ({ small = false }: { small?: boolean }) => (
  <div className={`${small ? 'w-7 h-7' : 'w-9 h-9'} bg-green-pale rounded-full flex items-center justify-center flex-shrink-0`}>
    <svg className={`${small ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-green-dark`} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  </div>
)

// ─── Burbuja de "escribiendo…" ─────────────────────────────────────────────────
function TypingBubble() {
  return (
    <div className="flex gap-2.5 items-end">
      <IconAvatar small />
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-1.5 h-1.5 bg-green-mid rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Burbuja de mensaje ────────────────────────────────────────────────────────
function Bubble({ msg }: { msg: Message }) {
  if (msg.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-green-dark rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[235px]">
          <p className="text-sm text-white leading-relaxed">{msg.content}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex gap-2.5 items-end">
      <IconAvatar small />
      <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm max-w-[235px]">
        <p className="text-sm text-ink-dark leading-relaxed whitespace-pre-wrap">{msg.content}</p>
      </div>
    </div>
  )
}

// ─── Componente principal ──────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open,         setOpen]         = useState(false)
  const [messages,     setMessages]     = useState<Message[]>([])
  const [input,        setInput]        = useState('')
  const [loading,      setLoading]      = useState(false)
  const [limitReached, setLimitReached] = useState(false)

  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)

  // Leer límite guardado en localStorage
  useEffect(() => {
    try {
      const used = parseInt(localStorage.getItem(STORE_KEY) ?? '0', 10)
      if (used >= MAX_MSGS) setLimitReached(true)
    } catch {}
  }, [])

  // Scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Foco en el input al abrir
  useEffect(() => {
    if (open && !limitReached) setTimeout(() => inputRef.current?.focus(), 120)
  }, [open, limitReached])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading || limitReached) return

    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: newMessages }),
      })

      if (res.status === 429) {
        setLimitReached(true)
        setLoading(false)
        return
      }

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setMessages([...newMessages, { role: 'assistant', content: data.message }])

      // Actualizar contador en localStorage
      try {
        const prev = parseInt(localStorage.getItem(STORE_KEY) ?? '0', 10)
        const next = prev + 1
        localStorage.setItem(STORE_KEY, String(next))
        if (next >= MAX_MSGS) setLimitReached(true)
      } catch {}

    } catch {
      setMessages([
        ...newMessages,
        {
          role:    'assistant',
          content: 'Ups, algo falló 😅 Escríbeme directamente al WhatsApp y te ayudo enseguida: 610 06 06 68 ❤️',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Panel de chat ──────────────────────────────────────────────────────── */}
      {open && (
        <div
          className="w-[340px] bg-white rounded-3xl shadow-2xl border border-ink-dark/[0.07] overflow-hidden flex flex-col"
          style={{ maxHeight: '520px' }}
        >
          {/* Header */}
          <div className="bg-green-dark px-5 py-4 flex items-center gap-3 flex-shrink-0">
            <IconAvatar />
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Yerlina ✨</p>
              <p className="text-white/55 text-[0.65rem] mt-0.5">Mi Vida en Forma</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Cerrar chat"
            >
              <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 bg-beige-light/60 flex flex-col gap-3 min-h-0">

            {/* Bienvenida fija */}
            <div className="flex gap-2.5 items-end">
              <IconAvatar small />
              <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm max-w-[235px]">
                <p className="text-sm text-ink-dark leading-relaxed">
                  ¡Hola! Soy Yerlina 👋 ¿Tienes alguna pregunta sobre mis programas? Con mucho gusto te ayudo ❤️
                </p>
              </div>
            </div>

            {/* Conversación */}
            {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}

            {/* Escribiendo… */}
            {loading && <TypingBubble />}

            {/* Límite alcanzado */}
            {limitReached && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-center mt-1">
                <p className="text-xs text-amber-800 leading-relaxed">
                  Has llegado al límite de mensajes de hoy 😊<br />
                  ¡Escríbenos directamente!<br />
                  <a
                    href="https://wa.me/34610060668"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline mt-1 inline-block"
                  >
                    WhatsApp: 610 06 06 68
                  </a>
                </p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {!limitReached && (
            <div className="px-4 py-3 border-t border-ink-dark/[0.06] flex items-center gap-2 bg-white flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu pregunta…"
                disabled={loading}
                className="flex-1 text-sm text-ink-dark placeholder:text-ink-light/70 outline-none bg-transparent disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-8 h-8 bg-green-dark hover:bg-green-mid disabled:opacity-40 disabled:cursor-not-allowed rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                aria-label="Enviar"
              >
                <IconSend />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Botón flotante ─────────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(v => !v)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
          open ? 'bg-ink-dark' : 'bg-green-dark'
        }`}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
      >
        {open ? <IconClose /> : <IconChat />}
      </button>

      {/* Pulse ring (solo cuando cerrado) */}
      {!open && (
        <span className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-green-mid/30 animate-ping pointer-events-none" />
      )}
    </div>
  )
}
