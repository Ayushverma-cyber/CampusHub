import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {
  GraduationCap,
  Mail,
  Lock,
  ShieldCheck,
  BookOpen,
  UserRound,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { loginUser } from '../services/authService'

function Login() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [role, setRole] = useState('Student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const data = await loginUser({
      email,
      password,
    })

    // Save token and user in localStorage
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    // Update auth context
    login(data.user)

    // Redirect after login
    navigate('/home')
  } catch (error) {
    alert(error.message)
  }
}

  const roles = [
    { label: 'Student', icon: UserRound },
    { label: 'Faculty', icon: BookOpen },
    { label: 'Admin', icon: ShieldCheck },
  ]

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl rounded-[32px] border border-slate-800 bg-[#0b1220]/90 backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.12)] overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* Left Panel */}
          <div className="relative p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-800 bg-gradient-to-br from-[#111827] via-[#0b1220] to-[#111827]">

            <div className="flex items-center gap-4 mb-10">
              <div className="h-14 w-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <GraduationCap className="h-7 w-7 text-indigo-400" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">CampusHub</h1>
                <p className="text-xs tracking-[0.2em] uppercase text-slate-400">
                  Student Portal
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Streamline Campus Life & Learning
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                Access your grades, course materials, attendance records, and
                campus notices from one secure platform designed for students
                and faculty.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Real-time Grade Tracking</span>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Integrated Attendance Records</span>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Faculty & Department Portal</span>
              </div>
            </div>

            <p className="mt-16 text-sm text-slate-500">
              © 2026 CampusHub. All rights reserved.
            </p>
          </div>

          {/* Right Panel */}
          <div className="p-8 md:p-12 lg:p-14 bg-[#0b1220]">

            <div className="max-w-xl mx-auto">

              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Welcome back
                </h2>

                <p className="text-slate-400">
                  Enter your credentials to access your dashboard.
                </p>
              </div>

              {/* Role Selector */}
              <div className="mb-8">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">
                  Select your role
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {roles.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setRole(label)}
                      className={`rounded-2xl border px-3 py-4 transition-all ${
                        role === label
                          ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-lg shadow-indigo-600/10'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Institutional Email
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.morgan@university.edu"
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Remember */}
                <label className="flex items-center gap-3 text-sm text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500"
                  />
                  Remember this device for 30 days
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="group w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] hover:from-indigo-400 hover:to-blue-400 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Sign In to CampusHub
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-400">
                New here?
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="ml-2 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login