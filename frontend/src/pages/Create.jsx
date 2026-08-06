import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Create = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
  try {
    const response = await fetch(
      'https://campushub-production-b658.up.railway.app/api/courses',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.title,
          code: data.code,
          instructor: data.instructor,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to create course')
    }

    toast.success('Course created successfully!')

    reset()
    navigate('/course')
  } catch (error) {
    console.error(error)
    toast.error('Failed to create course')
  }
}
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-2xl bg-[#0f172a] border border-slate-800 rounded-[28px] shadow-2xl p-8 md:p-10 relative">

        {/* Close Button */}
        <button
          onClick={() => navigate('/course')}
          className="absolute right-6 top-6 text-slate-400 hover:text-white text-2xl font-light"
        >
          
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-white mb-2">
          Create New Course
        </h2>

        <p className="text-slate-400 text-base mb-8">
          Fill in details to list a new academic course.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Course Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Course Title
            </label>

            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="e.g. Quantum Computing 101"
              className="w-full bg-slate-800/80 border border-slate-700 text-slate-100 placeholder:text-slate-500 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Course Code
            </label>

            <input
              {...register('code', { required: true })}
              type="text"
              placeholder="e.g. CS-501"
              className="w-full bg-slate-800/80 border border-slate-700 text-slate-100 placeholder:text-slate-500 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Instructor
            </label>

            <input
              {...register('instructor', { required: true })}
              type="text"
              placeholder="e.g. Dr. Marie Curie"
              className="w-full bg-slate-800/80 border border-slate-700 text-slate-100 placeholder:text-slate-500 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() => navigate('/course')}
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-200"
            >
              Save Course
            </button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default Create