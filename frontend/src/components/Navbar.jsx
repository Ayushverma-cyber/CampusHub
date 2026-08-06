import { Link } from 'react-router-dom'
function Navbar() {
 const user = JSON.parse(localStorage.getItem('user'))

  const role = user?.role

  return (
    <nav className="w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        <div className="flex flex-1 items-center justify-start gap-3 text-sm font-medium text-slate-200 sm:gap-4 lg:gap-6 lg:text-base flex-wrap">

          {/* Visible to everyone */}
          <Link
            to="/home"
            className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800 hover:text-indigo-300"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800 hover:text-indigo-300"
          >
            Dashboard
          </Link>

          <Link
            to="/course"
            className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800 hover:text-indigo-300"
          >
            Courses
          </Link>

          <Link
            to="/attendance"
            className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800 hover:text-indigo-300"
          >
            Attendance
          </Link>

          <Link
            to="/grades"
            className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800 hover:text-indigo-300"
          >
            Grades
          </Link>

          <Link
            to="/batches"
            className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800 hover:text-indigo-300"
          >
            Batches
          </Link>

          {/* Only admin and faculty */}
          {(role === 'admin' || role === 'faculty') && (
            <Link
              to="/students"
              className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800 hover:text-indigo-300"
            >
              Students
            </Link>
          )}

          {/* Only admin */}
          {role === 'admin' && (
            <Link
              to="/create"
              className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800 hover:text-indigo-300"
            >
              Create
            </Link>
          )}

          {/* Role badge */}
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
            {role?.toUpperCase()}
          </span>

        </div>

       <div className="flex items-center gap-4">
  <div className="text-right hidden sm:block">
    <p className="text-sm font-semibold text-white">
      {user?.name || 'User'}
    </p>
    <p className="text-xs text-slate-400 capitalize">
      {user?.role || 'guest'}
    </p>
  </div>

  <Link
    to="/delete"
    className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-rose-500/10 hover:text-rose-300 lg:text-base"
  >
    Logout
  </Link>
</div>
</div>
    </nav>
  )
  }

export default Navbar