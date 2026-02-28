import { useEffect, useRef } from 'react'
import Message from './Message'
import InputBox from './InputBox'

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '11px', color: 'var(--text-muted)',
        fontFamily: 'var(--font-display)', fontWeight: 700, flexShrink: 0,
      }}>😀</div>
      <div style={{
        padding: '14px 18px',
        background: 'var(--ai-bubble)',
        border: '1px solid var(--border)',
        borderRadius: '4px 14px 14px 14px',
        display: 'flex', gap: '5px', alignItems: 'center',
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--text-muted)',
            animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
        <style>{`
          @keyframes dot-bounce {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  )
}

export default function ChatBox({ messages, isTyping, onSend }) {
  const bottomRef = useRef(null)
  const prevCountRef = useRef(messages.length)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    prevCountRef.current = messages.length
  }, [messages, isTyping])

  return (
    <>
      {/* Messages area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '24px 0 8px',
      }}>
        {messages.map((msg, i) => (
          <Message
            key={msg.id}
            {...msg}
            animate={i === messages.length - 1 && i >= prevCountRef.current}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <InputBox onSend={onSend} disabled={isTyping} />
    </>
  )
}