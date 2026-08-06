import { useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'

function Delete() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const hasLoggedOut = useRef(false)

  useEffect(() => {
    if (hasLoggedOut.current) return
    hasLoggedOut.current = true

    logout()

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    toast.success('Logged out successfully')

    setTimeout(() => {
      navigate('/auth', { replace: true })
    }, 800)
  }, [])

  return null
}

export default Delete