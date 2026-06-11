import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { resolveIntent } from '../../i18n/chatbotLogic'

let msgCounter = 0
const nextId = () => `msg-${++msgCounter}`

function BotMessage({ text }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] border-2 border-line/30 bg-surface px-4 py-3 font-mono text-sm leading-relaxed text-fg whitespace-pre-line break-all">
        <span className="mono-label mb-2 block text-accent">Zeno</span>
        {text}
      </div>
    </div>
  )
}

function UserMessage({ text }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[90%] border-2 border-accent bg-accent px-4 py-3 font-mono text-sm leading-relaxed text-bg">
        {text}
      </div>
    </div>
  )
}

export default function FaqChatbot() {
  const { t, locale } = useLanguage()
  const { chatbot } = t

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = listRef.current
      if (el) el.scrollTop = el.scrollHeight
    })
  }

  useEffect(() => {
    setMessages([{ id: nextId(), role: 'bot', text: resolveIntent('greeting', t) }])
    setTyping(false)
  }, [locale, t])

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const reply = (userText, intentId) => {
    const trimmed = userText.trim()
    if (!trimmed) return

    const botText = resolveIntent(intentId, t)

    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: 'user', text: trimmed },
    ])
    setTyping(true)

    const delay = Math.floor(Math.random() * 1000) + 1000
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'bot', text: botText },
      ])
      setTyping(false)
    }, delay)
  }

  const handleQuickReply = (intentId, label) => {
    reply(label, intentId)
  }

  return (
    <div className="fixed bottom-20 right-6 z-40 hidden flex-col items-end gap-3 sm:flex">
      <div
        id="faq-chat-panel"
        role="dialog"
        aria-label={chatbot.title}
        aria-hidden={!open}
        className={`flex w-[min(360px,calc(100vw-1.5rem))] flex-col border-2 border-fg bg-bg shadow-brutal transition-all duration-300 ease-[var(--ease-brutal)] sm:w-[360px] ${
          open
            ? 'pointer-events-auto max-h-[min(520px,72vh)] translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 translate-y-4 overflow-hidden opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-line/30 px-4 py-3">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide">{chatbot.title}</p>
            <p className="mono-label text-muted">{chatbot.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={chatbot.closeLabel}
            className="grid h-8 w-8 shrink-0 place-items-center border-2 border-line/40 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
          >
            ✕
          </button>
        </div>

        <div
          ref={listRef}
          className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          aria-live="polite"
        >
          {messages.map((msg) =>
            msg.role === 'bot' ? (
              <BotMessage key={msg.id} text={msg.text} />
            ) : (
              <UserMessage key={msg.id} text={msg.text} />
            ),
          )}
          {typing && (
            <div className="flex justify-start">
              <div className="border-2 border-line/30 bg-surface px-4 py-3 font-mono text-sm text-muted">
                <span className="mono-label text-accent">Zeno</span> {chatbot.typing}
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t-2 border-line/20 px-4 py-3">
          <p className="mono-label mb-2 text-muted">{chatbot.quickLabel}</p>
          <div className="flex flex-wrap gap-2">
            {chatbot.quickReplies.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleQuickReply(item.id, item.label)}
                disabled={typing}
                className="border-2 border-line/40 px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="faq-chat-panel"
        aria-label={open ? chatbot.closeLabel : chatbot.openLabel}
        className={`grid h-12 w-12 place-items-center border-2 font-mono text-lg font-bold transition-all duration-300 ease-[var(--ease-brutal)] hover:-translate-y-1 hover:shadow-brutal-sm ${
          open
            ? 'border-accent bg-accent text-bg'
            : 'border-fg bg-bg text-fg hover:border-accent hover:bg-accent hover:text-bg'
        }`}
      >
        {open ? '✕' : '?'}
      </button>
    </div>
  )
}