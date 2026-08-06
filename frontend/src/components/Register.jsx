import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  Mail,
  Lock,
  ShieldCheck,
  BookOpen,
  UserRound,
  ArrowRight,
  CheckCircle2,
  UserPlus,
} from 'lucide-react'

function Register() {
  const navigate = useNavigate()

  const [role, setRole] = useState('Student')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const roles = [
    { label: 'Student', icon: UserRound },
    { label: 'Faculty', icon: BookOpen },
    { label: 'Admin', icon: ShieldCheck },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.2),_transparent_32%),linear-gradient(135deg,_#050816_0%,_#0b1220_100%)] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl rounded-[32px] border border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl shadow-[0_0_80px_rgba(79,70,229,0.18)] overflow-hidden">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative p-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.25),_transparent_30%)]" />
            <div className="relative z-10">
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
                  Create your account and get started
                </h2>

                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                  Join a modern student experience with secure access to courses, attendance, and campus updates.
                </p>
              </div>

              <div className="mt-12 rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Everything in one place</p>
                    <p className="text-sm text-slate-400">Stay organized across academics, attendance, and notices.</p>
                  </div>
                </div>
              </div>

              <p className="mt-16 text-sm text-slate-500">
                © 2026 CampusHub. All rights reserved.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-10 lg:p-12 bg-slate-950/70">
            <div className="max-w-xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Register
                </h2>

                <p className="text-slate-400">
                  Fill in your details to create your CampusHub account.
                </p>
              </div>

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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

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

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>

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

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 text-sm text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  I agree to the terms and privacy policy
                </label>

                <button
                  type="submit"
                  className="group w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] hover:from-indigo-400 hover:to-blue-400 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Create Account
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register