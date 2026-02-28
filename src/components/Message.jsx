import { useEffect, useRef } from 'react'

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export default function Message({ role, text, timestamp, animate }) {
  const isUser = role === 'user'
  const ref = useRef(null)

  useEffect(() => {
    if (animate && ref.current) {
      ref.current.animate(
        [
          { opacity: 0, transform: `translateY(${isUser ? 12 : -4}px)` },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 280, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
      )
    }
  }, [animate, isUser])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        gap: '4px',
        opacity: animate ? 0 : 1,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}>
        {/* Avatar */}
        <div style={{
          width: 28,
          height: 28,
          borderRadius: isUser ? '8px' : '50%',
          background: isUser ? 'var(--accent)' : 'var(--surface-2)',
          border: isUser ? 'none' : '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 700,
          color: isUser ? 'var(--bg)' : 'var(--text-muted)',
          flexShrink: 0,
          fontFamily: 'var(--font-display)',
        }}>
          {isUser ? '😎' : '😀'}
        </div>

        <span style={{
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-mono)',
        }}>
          {isUser ? 'YOU' : 'SMILE'} · {formatTime(timestamp)}
        </span>
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: '76%',
        padding: '12px 16px',
        borderRadius: isUser
          ? '14px 4px 14px 14px'
          : '4px 14px 14px 14px',
        background: isUser ? 'var(--user-bubble)' : 'var(--ai-bubble)',
        border: `1px solid ${isUser ? 'rgba(200, 241, 53, 0.2)' : 'var(--border)'}`,
        color: 'var(--text)',
        fontFamily: 'var(--font-mono)',
        fontSize: '13.5px',
        lineHeight: '1.65',
        wordBreak: 'break-word',
        position: 'relative',
      }}>
        {isUser && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: 'inherit',
            background: 'radial-gradient(ellipse at top right, rgba(200,241,53,0.04), transparent 60%)',
            pointerEvents: 'none',
          }} />
        )}
        {text}
      </div>
    </div>
  )
}