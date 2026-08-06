import { Navigate } from 'react-router-dom'

function RoleRoute({ children, allowedRoles }) {
const user = JSON.parse(localStorage.getItem('user'))

if (!user) {
return <Navigate to="/auth" replace />
}

if (!allowedRoles.includes(user.role)) {
return <Navigate to="/home" replace />
}

return children
}

export default RoleRoute
