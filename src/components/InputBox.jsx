import { useState, useRef, useEffect } from 'react'

export default function InputBox({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const adjust = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 180) + 'px'
  }

  useEffect(() => { adjust() }, [value])

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div style={{
      padding: '16px 0 24px',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-end',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '10px 10px 10px 16px',
        transition: 'border-color 0.2s',
      }}
        onFocusCapture={(e) => { e.currentTarget.style.borderColor = 'rgba(200,241,53,0.4)' }}
        onBlurCapture={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message… (Enter to send)"
          disabled={disabled}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            color: 'var(--text)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13.5px',
            lineHeight: '1.6',
            overflowY: 'auto',
            maxHeight: '180px',
            caretColor: 'var(--accent)',
          }}
        />

        <button
          onClick={submit}
          disabled={!value.trim() || disabled}
          title="Send (Enter)"
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: '10px',
            border: 'none',
            background: value.trim() && !disabled ? 'var(--accent)' : 'var(--surface-2)',
            color: value.trim() && !disabled ? 'var(--bg)' : 'var(--text-muted)',
            cursor: value.trim() && !disabled ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s, transform 0.1s',
            fontSize: '16px',
          }}
          onMouseDown={(e) => { if (value.trim() && !disabled) e.currentTarget.style.transform = 'scale(0.92)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          😀
        </button>
      </div>
      <p style={{
        marginTop: '8px',
        textAlign: 'center',
        fontSize: '10px',
        color: 'var(--text-muted)',
        letterSpacing: '0.05em',
      }}>
        SHIFT+ENTER for new line
      </p>
    </div>
  )
}