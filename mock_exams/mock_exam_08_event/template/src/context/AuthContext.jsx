import { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const isAuthenticated = !!user

  const loginUser = (userData) => {
    setUser(userData)
    sessionStorage.setItem('user', JSON.stringify(userData))
  }

  const logoutUser = () => {
    setUser(null)
    sessionStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
