import { useState, useEffect } from 'react'
import ChatBox from '../components/ChatBox'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    text: "Hello. I'm ready when you are.",
    timestamp: new Date(Date.now() - 60000),
  },
]

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN

export default function Home() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const { logout } = useAuth()

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.style.setProperty('--bg', '#0e0e11')
      root.style.setProperty('--surface', '#16161a')
      root.style.setProperty('--surface-2', '#1e1e24')
      root.style.setProperty('--border', '#2a2a35')
      root.style.setProperty('--text', '#f0f0f0')
      root.style.setProperty('--text-muted', '#6b6b80')
      root.style.setProperty('--user-bubble', '#1a2a00')
      root.style.setProperty('--ai-bubble', '#1e1e24')
      root.style.setProperty('--accent', '#c8f135')
      root.style.setProperty('--accent-dim', 'rgba(200, 241, 53, 0.12)')
    } else {
      root.style.setProperty('--bg', '#f5f5f0')
      root.style.setProperty('--surface', '#ffffff')
      root.style.setProperty('--surface-2', '#ebebeb')
      root.style.setProperty('--border', '#d0d0d0')
      root.style.setProperty('--text', '#1a1a1a')
      root.style.setProperty('--text-muted', '#888888')
      root.style.setProperty('--user-bubble', '#e8f5c8')
      root.style.setProperty('--ai-bubble', '#ffffff')
      root.style.setProperty('--accent', '#2d7a00')
      root.style.setProperty('--accent-dim', 'rgba(45, 122, 0, 0.1)')
    }
  }, [isDark])

  const handleSend = async (text) => {
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setIsTyping(true)

    try {
      const response = await fetch(
        '/hf-router/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'meta-llama/Llama-3.1-8B-Instruct:cerebras',
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.text,
            })),
            max_tokens: 300,
            temperature: 0.7,
          }),
        }
      )

      const data = await response.json()
      const aiText = data?.choices?.[0]?.message?.content?.trim() || 'Sorry, no response.'

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        text: aiText,
        timestamp: new Date(),
      }])
    } catch (error) {
      console.error('HF error:', error)
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        text: 'Something went wrong. Please try again.',
        timestamp: new Date(),
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '760px',
      margin: '0 auto',
      padding: '0 16px',
    }}>
      <header style={{
        padding: '28px 0 20px',
        display: 'flex',
        alignItems: 'baseline',
        gap: '12px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: 'var(--accent)',
        }}>
          SMILE
        </h1>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          HELLOOO!!!
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Dark/Light toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,241,53,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Online dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 8px var(--accent)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              ONLINE
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            style={{
              padding: '5px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#ff8080'
              e.currentTarget.style.borderColor = 'rgba(255,80,80,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            LOGOUT
          </button>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </header>

      <ChatBox messages={messages} isTyping={isTyping} onSend={handleSend} />
      <Footer />
    </div>
  )
}