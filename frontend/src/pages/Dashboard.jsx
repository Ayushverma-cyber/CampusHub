import { useEffect, useState } from 'react'
import {
  Users,
  Layers,
  CalendarDays,
  BookOpen,
  GraduationCap,
} from 'lucide-react'
import toast from 'react-hot-toast'

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role

  const [stats, setStats] = useState({
    students: 0,
    batches: 0,
    attendance: 0,
    grades: 0,
  })

  const [myAttendance, setMyAttendance] = useState([])
  const [myGrades, setMyGrades] = useState([])
  const [myBatch, setMyBatch] = useState(null)
  const [myCourses, setMyCourses] = useState([])

  useEffect(() => {
    if (role === 'student') {
      loadStudentData()
    } else {
      loadAdminData()
    }
  }, [])

  // Student dashboard
  const loadStudentData = async () => {
    try {
      const [attendanceRes, gradesRes, batchRes, coursesRes] =
        await Promise.all([
          fetch(
            `https://campushub-production-b658.up.railway.app/api/students/student-attendance/${user.email}`
          ),
          fetch(
            `https://campushub-production-b658.up.railway.app/api/students/student-grades/${user.email}`
          ),
          fetch(
            `https://campushub-production-b658.up.railway.app/api/students/student-batch/${user.email}`
          ),
          fetch(
            `https://campushub-production-b658.up.railway.app/api/students/student-courses/${user.email}`
          ),
        ])

      setMyAttendance(await attendanceRes.json())
      setMyGrades(await gradesRes.json())
      setMyBatch(await batchRes.json())
      setMyCourses(await coursesRes.json())
    } catch (error) {
      console.error(error)
        toast.error('Failed to load student dashboard')
    }
  }

  // Admin/Faculty dashboard
  const loadAdminData = async () => {
    try {
      const response = await fetch(
        'https://campushub-production-b658.up.railway.app/api/dashboard/stats'
      )

      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error(error)
      toast.error('Failed to load dashboard statistics')
    }
  }

  // ---------- STUDENT VIEW ----------
  if (role === 'student') {
    const presentCount = myAttendance.filter(
      (a) => a.status === 'Present'
    ).length

    const attendancePercent =
      myAttendance.length > 0
        ? Math.round((presentCount / myAttendance.length) * 100)
        : 0

    const averageMarks =
      myGrades.length > 0
        ? (
            myGrades.reduce((sum, g) => sum + g.marks, 0) /
            myGrades.length
          ).toFixed(1)
        : 0

    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6 text-white">

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-700 p-8 shadow-2xl">
          <h1 className="text-4xl font-bold">
            Welcome back, {user?.name || 'Student'} 🎓
          </h1>

          <p className="mt-2 text-indigo-100">
            Here is your personal academic dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <p className="text-slate-400">Attendance</p>
            <p className="text-4xl font-bold mt-2 text-emerald-400">
              {attendancePercent}%
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <p className="text-slate-400">Average Marks</p>
            <p className="text-4xl font-bold mt-2 text-amber-400">
              {averageMarks}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <p className="text-slate-400">Enrolled Courses</p>
            <p className="text-4xl font-bold mt-2 text-indigo-400">
              {myCourses.length}
            </p>
          </div>

        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-400" />
            My Batch
          </h2>

          <p className="text-slate-300">
            {myBatch?.batch || 'N/A'} • {myBatch?.department || 'N/A'}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            My Courses
          </h2>

          <div className="space-y-3">
            {myCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3">

                <div>
                  <p className="font-medium">
                    {course.name}
                  </p>

                  <p className="text-sm text-slate-400">
                    {course.instructor}
                  </p>
                </div>

                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300 border border-indigo-500/20">
                  {course.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ---------- ADMIN/FACULTY VIEW ----------
  const cards = [
    {
      title: 'Total Students',
      value: stats.students,
      icon: Users,
      color: 'text-blue-400',
    },
    {
      title: 'Total Batches',
      value: stats.batches,
      icon: Layers,
      color: 'text-indigo-400',
    },
    {
      title: 'Attendance Records',
      value: stats.attendance,
      icon: CalendarDays,
      color: 'text-emerald-400',
    },
    {
      title: 'Grade Records',
      value: stats.grades,
      icon: BookOpen,
      color: 'text-amber-400',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 text-white">

      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400 mt-2">
          CampusHub administration overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => {
          const Icon = card.icon

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">
                    {card.title}
                  </p>

                  <p className="text-4xl font-bold mt-2">
                    {card.value}
                  </p>
                </div>

                <Icon className={`h-7 w-7 ${card.color}`} />
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default Dashboard