import { useEffect, useState } from 'react'
import { BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'

function Course() {
const user = JSON.parse(localStorage.getItem('user'))
const role = user?.role

const [courses, setCourses] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
fetchCourses()
}, [])

const fetchCourses = async () => {
try {
let url = 'http://localhost:5000/api/courses'


  // Students see only enrolled courses
  if (role === 'student') {
    url = `http://localhost:5000/api/students/student-courses/${user.email}`
  }

  const response = await fetch(url)
  const data = await response.json()

  setCourses(data)
} catch (error) {
  console.error(error)
  toast.error('Failed to load courses')
} finally {
  setLoading(false)
}


}

return ( <div className="max-w-6xl mx-auto p-6 space-y-6 text-white">


  <div className="flex items-center gap-3">
    <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
      <BookOpen className="h-6 w-6 text-indigo-400" />
    </div>

    <div>
      <h1 className="text-3xl font-bold">
        {role === 'student' ? 'My Courses' : 'Courses'}
      </h1>

      <p className="text-slate-400 text-sm">
        {role === 'student'
          ? 'Courses you are enrolled in.'
          : 'All available courses in the system.'}
      </p>
    </div>
  </div>

  {loading ? (
    <p className="text-slate-400">Loading courses...</p>
  ) : (
    <div className="grid md:grid-cols-2 gap-6">

      {courses.map((course) => (
        <div
          key={course.id}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg hover:border-indigo-500/30 transition-all">

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {course.code}
            </span>
          </div>

          <h2 className="text-xl font-semibold">
            {course.name}
          </h2>

          <p className="text-slate-400 mt-2">
            Instructor: {course.instructor}
          </p>
        </div>
      ))}

      {courses.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400 md:col-span-2">
          No courses found.
        </div>
      )}

    </div>
  )}
</div>


)
}

export default Course
