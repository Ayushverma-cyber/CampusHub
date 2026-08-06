import { useState } from 'react'
import { AuthContext } from './AuthContext'

function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
const stored = localStorage.getItem('user')
return stored ? JSON.parse(stored) : null
})

const login = (userData) => {
setUser(userData)
}

const logout = () => {
localStorage.removeItem('token')
localStorage.removeItem('user')
setUser(null)
}

return (
<AuthContext.Provider value={{ user, login, logout }}>
{children}
</AuthContext.Provider>
)
}

export default AuthProvider
