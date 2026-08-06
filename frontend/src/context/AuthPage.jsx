import { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {isLogin ? <Login /> : <Register />}

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-600 hover:underline font-medium"
      >
        {isLogin
          ? 'Create a new account'
          : 'Already have an account? Login'}
      </button>
    </div>
  )
}

export default AuthPage