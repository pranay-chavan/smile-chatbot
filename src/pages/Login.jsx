import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { auth, googleProvider, githubProvider } from '../firebase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (fn) => async () => {
    setError('')
    setLoading(true)
    try {
      await fn()
      navigate('/')
    } catch (e) {
      setError(e.message.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  const loginGoogle = handle(() => signInWithPopup(auth, googleProvider))
  const loginGithub = handle(() => signInWithPopup(auth, githubProvider))
  const loginEmail = handle(() => signInWithEmailAndPassword(auth, email, password))

  const sendOtp = async () => {
    setError('')
    setLoading(true)
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' })
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      window.confirmationResult = result
      setOtpSent(true)
    } catch (e) {
      setError(e.message.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = handle(async () => {
    await window.confirmationResult.confirm(otp)
  })

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
        gap: '20px',
      }}>
        {/* Header */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 800,
            color: 'var(--accent)',
            letterSpacing: '-0.5px',
          }}>SMILE</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
            Sign in to continue to CHAT
          </p>
        </div>

        {/* Error */}
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

        {/* Social buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <SocialButton onClick={loginGoogle} disabled={loading} label="Continue with Google" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          } />
          <SocialButton onClick={loginGithub} disabled={loading} label="Continue with GitHub" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          } />
        </div>

        <Divider />

        {/* Email/Password */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <ActionButton onClick={loginEmail} disabled={loading || !email || !password} label={loading ? 'Signing in...' : 'Sign in with Email'} />
        </div>

        <Divider />

        {/* Phone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {!otpSent ? (
            <>
              <Input placeholder="Phone (+91...)" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              <ActionButton onClick={sendOtp} disabled={loading || !phone} label={loading ? 'Sending...' : 'Send OTP'} />
            </>
          ) : (
            <>
              <Input placeholder="Enter OTP" type="text" value={otp} onChange={e => setOtp(e.target.value)} />
              <ActionButton onClick={verifyOtp} disabled={loading || !otp} label={loading ? 'Verifying...' : 'Verify OTP'} />
            </>
          )}
          <div id="recaptcha-container" />
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

function SocialButton({ onClick, disabled, label, icon }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
      padding: '11px', borderRadius: '10px', border: '1px solid var(--border)',
      background: 'var(--surface-2)', color: 'var(--text)', cursor: 'pointer',
      fontFamily: 'var(--font-mono)', fontSize: '13px', transition: 'border-color 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,241,53,0.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {icon} {label}
    </button>
  )
}

function Input({ placeholder, type, value, onChange }) {
  return (
    <input
      type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{
        padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--border)',
        background: 'var(--surface-2)', color: 'var(--text)', outline: 'none',
        fontFamily: 'var(--font-mono)', fontSize: '13px', caretColor: 'var(--accent)',
      }}
    />
  )
}

function ActionButton({ onClick, disabled, label }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '11px', borderRadius: '10px', border: 'none',
      background: disabled ? 'var(--surface-2)' : 'var(--accent)',
      color: disabled ? 'var(--text-muted)' : 'var(--bg)',
      cursor: disabled ? 'default' : 'pointer',
      fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700,
      transition: 'background 0.15s',
    }}>{label}</button>
  )
}

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>or</span>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </div>
  )
}