import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { getStudents, updateStudent } from '../services/studentService'

function EditStudent() {
const { id } = useParams()
const navigate = useNavigate()

const { register, handleSubmit, reset } = useForm()

useEffect(() => {
loadStudent()
}, [])

const loadStudent = async () => {
try {
const students = await getStudents()
const student = students.find((s) => s.id === Number(id))


  if (student) {
    reset({
      name: student.name,
      rollNo: student.roll_no,
      email: student.email,
      batch: student.batch,
      department: student.department,
    })
  }
} catch (error) {
  alert('Failed to load student')
}


}

const onSubmit = async (data) => {
try {
await updateStudent(id, {
name: data.name,
roll_no: data.rollNo,
email: data.email,
batch: data.batch,
department: data.department,
})


  navigate('/students')
} catch (error) {
  alert('Failed to update student')
}


}

return ( <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6"> <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

```
    <h1 className="text-3xl font-bold text-white mb-2">
      Edit Student
    </h1>

    <p className="text-slate-400 mb-8">
      Update student information.
    </p>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      <input
        {...register('name', { required: true })}
        placeholder="Full Name"
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />

      <input
        {...register('rollNo', { required: true })}
        placeholder="Roll Number"
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />

      <input
        type="email"
        {...register('email', { required: true })}
        placeholder="Email"
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />

      <input
        {...register('batch', { required: true })}
        placeholder="Batch"
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />

      <input
        {...register('department', { required: true })}
        placeholder="Department"
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />

      <div className="flex justify-end gap-3 pt-2">

        <button
          type="button"
          onClick={() => navigate('/students')}
          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20"
        >
          Update Student
        </button>

      </div>

    </form>
  </div>
</div>


)
}

export default EditStudent
