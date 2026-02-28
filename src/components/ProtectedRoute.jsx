import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  console.log('loading:', loading, 'user:', user)

  if (loading) return null

  return user ? children : <Navigate to="/login" replace />
}