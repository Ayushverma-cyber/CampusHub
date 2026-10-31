import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/auth" replace />
  }

  // Role restriction
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role?.toLowerCase())
  ) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default ProtectedRoute
