'use client'

import { useState } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat panel */}
      {open && (
        <div className="w-[340px] bg-white rounded-3xl shadow-2xl border border-ink-dark/[0.07] overflow-hidden flex flex-col animate-in">
          {/* Header */}
          <div className="bg-green-dark px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Yerlina — Mi Vida en Forma</p>
              <p className="text-white/55 text-[0.65rem] mt-0.5">Responde en menos de 24h</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Cerrar chat"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-5 bg-beige-light/60">
            {/* Bot message */}
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-green-pale rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[220px]">
                <p className="text-sm text-ink-dark leading-relaxed">
                  ¡Hola! Soy Yerlina 👋 ¿Tienes alguna pregunta sobre mis programas?
                </p>
                <p className="text-[0.6rem] text-ink-light mt-1.5">Ahora mismo</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-ink-dark/[0.06] flex items-center gap-2 bg-white">
            <input
              type="text"
              placeholder="Escribe un mensaje…"
              className="flex-1 text-sm text-ink-dark placeholder:text-ink-light/70 outline-none bg-transparent"
              readOnly
            />
            <button
              className="w-8 h-8 bg-green-dark hover:bg-green-mid rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              aria-label="Enviar"
            >
              <svg className="w-3.5 h-3.5 text-white translate-x-px" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
          open ? 'bg-ink-dark rotate-0' : 'bg-green-dark'
        }`}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
      >
        {open ? (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        )}
      </button>

      {/* Pulse ring (solo cuando cerrado) */}
      {!open && (
        <span className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-green-mid/30 animate-ping pointer-events-none" />
      )}
    </div>
  )
}
