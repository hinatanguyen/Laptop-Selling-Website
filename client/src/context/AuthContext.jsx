import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    
    if (token) {
      try {
        const userData = await authService.getProfile()
        setUser(userData)
      } catch (error) {
        localStorage.removeItem('token')
        setUser(null)
      }
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    const { user, token } = await authService.login(email, password)
    // Enforce admin-only on client side too
    if (user?.role !== 'admin') {
      throw new Error('Admin access only')
    }
    localStorage.setItem('token', token)
    setUser(user)
    return user
  }

  // Registration disabled

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    // Navigate to home page after logout
    navigate('/')
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin: user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
