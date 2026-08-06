import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  // Not logged in
  if (!token) {
    return <Navigate to="/auth" replace />
  }

  // Role restriction
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default ProtectedRoute