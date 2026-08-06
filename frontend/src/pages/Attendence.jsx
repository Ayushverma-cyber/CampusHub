import { useEffect, useState } from 'react'
import { CalendarDays, Trash2 } from 'lucide-react'
import { getStudents } from '../services/studentService'
import toast from 'react-hot-toast'
import {
  getAttendance,
  markAttendance,
  deleteAttendance,
} from '../services/attendanceService'

function Attendence() {
  const user = JSON.parse(localStorage.getItem('user'))
  const isStudent = user?.role === 'student'

  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [status, setStatus] = useState('Present')
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      // Student: load only own attendance
      if (isStudent) {
        const response = await fetch(
          `http://localhost:5000/api/student-attendance/${user.email}`
        )

        const data = await response.json()
        setAttendance(data)
      } else {
        // Admin/Faculty: load everything
        const studentData = await getStudents()
        const attendanceData = await getAttendance()

        setStudents(studentData)
        setAttendance(attendanceData)

        if (studentData.length > 0) {
          setSelectedStudent(studentData[0].id)
        }
      }
    } catch (error) {
      console.error(error)
      alert('Failed to load attendance data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await markAttendance({
        student_id: selectedStudent,
        date,
        status,
      })

      loadData()
      toast.success('Attendance marked successfully')
    } catch (error) {
      toast.error('Failed to mark attendance')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this attendance record?')) return

    try {
      await deleteAttendance(id)
      loadData()
      toast.success('Attendance deleted successfully')
    } catch (error) {
      toast.error('Failed to delete attendance')
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
          <CalendarDays className="h-6 w-6 text-indigo-400" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            {isStudent ? 'My Attendance' : 'Attendance Management'}
          </h1>

          <p className="text-slate-400 text-sm">
            {isStudent
              ? 'View your attendance records.'
              : 'Mark and manage student attendance.'}
          </p>
        </div>
      </div>

      {/* Form - hidden for students */}
      {!isStudent && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-4 gap-4"
          >

            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.roll_no})
                </option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-4 py-3 shadow-lg shadow-indigo-600/20"
            >
              Mark Attendance
            </button>

          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">

        {loading ? (
          <div className="p-6 text-slate-400">
            Loading attendance...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-slate-800 text-slate-300 text-sm uppercase tracking-wide">
                <tr>

                  {!isStudent && (
                    <>
                      <th className="text-left px-6 py-4">Student</th>
                      <th className="text-left px-6 py-4">Roll No</th>
                    </>
                  )}

                  <th className="text-left px-6 py-4">Date</th>
                  <th className="text-left px-6 py-4">Status</th>

                  {!isStudent && (
                    <th className="text-center px-6 py-4">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">

                {attendance.length === 0 ? (
                  <tr>
                    <td
                      colSpan={isStudent ? 2 : 5}
                      className="text-center px-6 py-10 text-slate-500"
                    >
                      No attendance records found.
                    </td>
                  </tr>
                ) : (
                  attendance.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-slate-800/50 transition-colors"
                    >

                      {!isStudent && (
                        <>
                          <td className="px-6 py-4 text-white font-medium">
                            {record.name}
                          </td>

                          <td className="px-6 py-4 text-slate-300">
                            {record.roll_no}
                          </td>
                        </>
                      )}

                      <td className="px-6 py-4 text-slate-300">
                        {record.date?.slice(0, 10)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            record.status === 'Present'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>

                      {!isStudent && (
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Attendence