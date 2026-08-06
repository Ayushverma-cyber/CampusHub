import { useEffect, useState } from 'react'
import { BookOpen, Pencil, Trash2 } from 'lucide-react'
import { getStudents } from '../services/studentService'
import toast from 'react-hot-toast'
import {
  getGrades,
  addGrade,
  updateGrade,
  deleteGrade,
} from '../services/gradeService'

function Grades() {
  const [students, setStudents] = useState([])
  const [grades, setGrades] = useState([])

  const [studentId, setStudentId] = useState('')
  const [subject, setSubject] = useState('')
  const [marks, setMarks] = useState('')

  const [editingId, setEditingId] = useState(null)

  const user = JSON.parse(localStorage.getItem('user'))

  const canManage =
    user?.role === 'admin' || user?.role === 'faculty'

  // Students should see only their own grades
  const visibleGrades =
    user?.role === 'student'
      ? grades.filter((g) => g.email === user.email)
      : grades

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const studentData = await getStudents()
      const gradeData = await getGrades()

      setStudents(studentData)
      setGrades(gradeData)

      if (studentData.length > 0) {
        setStudentId(studentData[0].id)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load grades')
    }
  }

  const resetForm = () => {
    setSubject('')
    setMarks('')
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        await updateGrade(editingId, {
          subject,
          marks,
        })

        toast.success('Grade updated successfully')
      } else {
        await addGrade({
          student_id: studentId,
          subject,
          marks,
        })

        toast.success('Grade added successfully')
      }

      resetForm()
      loadData()
    } catch (error) {
      toast.error('Failed to save grade')
    }
  }

  const handleEdit = (grade) => {
    setEditingId(grade.id)
    setSubject(grade.subject)
    setMarks(grade.marks)
    setStudentId(grade.student_id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this grade?')) return

    try {
      await deleteGrade(id)
      loadData()
      toast.success('Grade deleted successfully')
    } catch (error) {
      toast.error('Failed to delete grade')
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-indigo-400" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            {user?.role === 'student'
              ? 'My Grades'
              : 'Grades Management'}
          </h1>

          <p className="text-slate-400 text-sm">
            {user?.role === 'student'
              ? 'View your academic performance.'
              : 'Manage student grades and marks.'}
          </p>
        </div>
      </div>

      {/* Form - only Admin/Faculty */}
      {canManage && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-4 gap-4"
          >

            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.roll_no})
                </option>
              ))}
            </select>

            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />

            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="Marks"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-4 py-3 shadow-lg shadow-indigo-600/20"
            >
              {editingId ? 'Update Grade' : 'Add Grade'}
            </button>

          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-slate-800 text-slate-300 text-sm uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-4">Student</th>
                <th className="text-left px-6 py-4">Roll No</th>
                <th className="text-left px-6 py-4">Subject</th>
                <th className="text-left px-6 py-4">Marks</th>
                <th className="text-left px-6 py-4">Grade</th>

                {canManage && (
                  <th className="text-center px-6 py-4">
                    Action
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">

              {visibleGrades.length === 0 ? (
                <tr>
                  <td
                    colSpan={canManage ? 6 : 5}
                    className="text-center px-6 py-10 text-slate-500"
                  >
                    No grades found.
                  </td>
                </tr>
              ) : (
                visibleGrades.map((grade) => (
                  <tr
                    key={grade.id}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {grade.name}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {grade.roll_no}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {grade.subject}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {grade.marks}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300">
                        {grade.grade}
                      </span>
                    </td>

                    {canManage && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">

                          <button
                            onClick={() => handleEdit(grade)}
                            className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-white transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(grade.id)}
                            className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Grades