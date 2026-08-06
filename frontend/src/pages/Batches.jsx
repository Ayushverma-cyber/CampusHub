import { useEffect, useState } from 'react'
import { Layers, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  getBatches,
  addBatch,
  updateBatch,
  deleteBatch,
} from '../services/batchService'

function Batches() {
  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.role === 'admin'
  const isStudent = user?.role === 'student'

  const [batches, setBatches] = useState([])

  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')

  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadBatches()
  }, [])

  const loadBatches = async () => {
    try {
      // Student: load only own batch
      if (isStudent) {
        const response = await fetch(
          `https://campushub-production-b658.up.railway.app/api/students/student-batch/${user.email}`
        )

        const data = await response.json()

        // Convert object to array for table rendering
        setBatches(data ? [data] : [])
        return
      }

      // Admin / Faculty: load all batches
      const data = await getBatches()
      setBatches(data)
    } catch (error) {
      console.error(error)
      toast.error('Failed to load batches')
    }
  }

  const resetForm = () => {
    setName('')
    setDepartment('')
    setYear('')
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        await updateBatch(editingId, {
          name,
          department,
          year,
        })

        toast.success('Batch updated successfully')
      } else {
        await addBatch({
          name,
          department,
          year,
        })

        toast.success('Batch created successfully')
      }

      resetForm()
      loadBatches()
    } catch (error) {
      toast.error('Failed to save batch')
    }
  }

  const handleEdit = (batch) => {
    setEditingId(batch.id)
    setName(batch.name)
    setDepartment(batch.department)
    setYear(batch.year)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this batch?')) return

    try {
      await deleteBatch(id)
      loadBatches()
      toast.success('Batch deleted successfully')
    } catch (error) {
      toast.error('Failed to delete batch')
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
          <Layers className="h-6 w-6 text-indigo-400" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            {isStudent ? 'My Batch' : 'Batch Management'}
          </h1>

          <p className="text-slate-400 text-sm">
            {isStudent
              ? 'View your batch information.'
              : 'Create and manage batches.'}
          </p>
        </div>
      </div>

      {/* Form - only Admin */}
      {isAdmin && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-4 gap-4"
          >

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Batch Name (e.g. CSE 2026)"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />

            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-4 py-3 shadow-lg shadow-indigo-600/20"
            >
              {editingId ? 'Update Batch' : 'Add Batch'}
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
                <th className="text-left px-6 py-4">Batch Name</th>
                <th className="text-left px-6 py-4">Department</th>
                <th className="text-left px-6 py-4">Year</th>

                {isAdmin && (
                  <th className="text-center px-6 py-4">
                    Action
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">

              {batches.length === 0 ? (
                <tr>
                  <td
                    colSpan={isAdmin ? 4 : 3}
                    className="text-center px-6 py-10 text-slate-500"
                  >
                    No batch found.
                  </td>
                </tr>
              ) : (
                batches.map((batch, index) => (
                  <tr
                    key={batch.id || index}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {batch.name||batch.batch}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {batch.department}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {batch.year||'N/A'}
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">

                          <button
                            onClick={() => handleEdit(batch)}
                            className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-white transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(batch.id)}
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

export default Batches