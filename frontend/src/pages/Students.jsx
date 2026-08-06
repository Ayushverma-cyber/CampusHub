import { useEffect, useState } from 'react'
import { Plus, Search, Trash2, Users, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getStudents, deleteStudent } from '../services/studentService'
import toast from 'react-hot-toast'

function Students() {
const navigate = useNavigate()

const [students, setStudents] = useState([])
const [search, setSearch] = useState('')
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
fetchStudents()
}, [])

const fetchStudents = async () => {
try {
setLoading(true)


  const data = await getStudents()

  console.log('Students from API:', data)

  setStudents(data)
  setError('')
} catch (err) {
  console.error('Fetch error:', err)
  setError('Failed to load students')
  toast.error('Failed to load students')
} finally {
  setLoading(false)
}


}

const handleDelete = async (id) => {
if (!window.confirm('Delete this student?')) return


try {
  await deleteStudent(id)
  fetchStudents()
  toast.success('Student deleted successfully')
} catch (err) {
  toast.error('Failed to delete student')
}


}

const filteredStudents = students.filter(
(student) =>
student.name.toLowerCase().includes(search.toLowerCase()) ||
student.roll_no.toLowerCase().includes(search.toLowerCase())
)

return ( <div className="max-w-7xl mx-auto p-6 space-y-6">

```
  {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
        <Users className="h-6 w-6 text-indigo-400" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white">Students</h1>
        <p className="text-slate-400 text-sm">
          Manage student records and batches.
        </p>
      </div>
    </div>

    <button
      onClick={() => navigate('/students/add')}
      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-600/20"
    >
      <Plus className="h-5 w-5" />
      Add Student
    </button>
  </div>

  {/* Search */}
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or roll number"
        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />
    </div>
  </div>

  {/* Loading */}
  {loading && (
    <div className="text-center text-slate-400 py-10">
      Loading students...
    </div>
  )}

  {/* Error */}
  {error && (
    <div className="text-center text-red-400 py-4">
      {error}
    </div>
  )}

  {/* Table */}
  {!loading && !error && (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-slate-800 text-slate-300 text-sm uppercase tracking-wide">
            <tr>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Roll No</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Batch</th>
              <th className="text-left px-6 py-4">Department</th>
              <th className="text-center px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">

            {filteredStudents.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center px-6 py-10 text-slate-500"
                >
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {student.name}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {student.roll_no}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {student.email}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {student.batch}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {student.department}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">

                      <button
                        onClick={() => navigate(`/students/edit/${student.id}`)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(student.id)}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
    </div>
  )}
</div>


)
}

export default Students
