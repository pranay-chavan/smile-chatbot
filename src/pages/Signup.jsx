import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    setError('')
    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: name })
      navigate('/')
    } catch (e) {
      setError(e.message.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '40px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 800,
            color: 'var(--accent)',
            letterSpacing: '-0.5px',
          }}>Create account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
            Join smile today
          </p>
        </div>

        {error && (
          <div style={{
            padding: '10px 14px',
            background: 'rgba(255,80,80,0.1)',
            border: '1px solid rgba(255,80,80,0.3)',
            borderRadius: '10px',
            color: '#ff8080',
            fontSize: '12px',
          }}>{error}</div>
        )}

        <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)}
          style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', caretColor: 'var(--accent)' }} />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}
          style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', caretColor: 'var(--accent)' }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
          style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', caretColor: 'var(--accent)' }} />

        <button onClick={handleSignup} disabled={loading || !name || !email || !password}
          style={{
            padding: '11px', borderRadius: '10px', border: 'none',
            background: loading || !name || !email || !password ? 'var(--surface-2)' : 'var(--accent)',
            color: loading || !name || !email || !password ? 'var(--text-muted)' : 'var(--bg)',
            cursor: loading || !name || !email || !password ? 'default' : 'pointer',
            fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700,
          }}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}