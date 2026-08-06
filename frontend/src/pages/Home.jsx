import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Users,
  Layers,
  CalendarDays,
  BookOpen,
  GraduationCap,
  Trophy,
  Clock,
} from "lucide-react";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [batch, setBatch] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === "student") {
      loadStudentData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadStudentData = async () => {
    try {
      const [attendanceRes, gradesRes, batchRes, coursesRes] =
        await Promise.all([
          fetch(
            `https://campushub-production-b658.up.railway.app/api/students/student-attendance/${user.email}`,
          ),
          fetch(
            `https://campushub-production-b658.up.railway.app/api/students/student-grades/${user.email}`,
          ),
          fetch(
            `https://campushub-production-b658.up.railway.app/api/students/student-batch/${user.email}`,
          ),
          fetch(
            `https://campushub-production-b658.up.railway.app/api/students/student-courses/${user.email}`,
          ),
        ]);

      setAttendance(await attendanceRes.json());
      setGrades(await gradesRes.json());
      setBatch(await batchRes.json());
      setCourses(await coursesRes.json());
    } catch (error) {
      console.error(error);
      toast.error("Failed to load student dashboard");
    } finally {
      setLoading(false);
    }
  };

  const loadAdminData = async () => {
    try {
      const response = await fetch("https://campushub-production-b658.up.railway.app/api/dashboard/stats");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard statistics");
    }
  };

  // ---------------- LOADING SCREEN ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // ---------------- STUDENT HOME ----------------
  if (role === "student") {
    const presentCount = attendance.filter(
      (a) => a.status === "Present",
    ).length;

    const attendancePercent =
      attendance.length > 0
        ? Math.round((presentCount / attendance.length) * 100)
        : 0;

    const averageMarks =
      grades.length > 0
        ? (grades.reduce((sum, g) => sum + g.marks, 0) / grades.length).toFixed(
            1,
          )
        : 0;

    const latestGrades = grades.slice(0, 3);

    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8 text-white">
        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome back, {user?.name || "Student"} 👋
          </h1>

          <p className="mt-3 text-indigo-100 text-lg">
            Stay on top of your academics and track your progress in real time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 border border-slate-700">
            Attendance
          </span>
          <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 border border-slate-700">
            Grades
          </span>
          <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 border border-slate-700">
            Batches
          </span>
          <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 border border-slate-700">
            Courses
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Attendance</p>

                <p className="text-4xl font-bold mt-2 text-emerald-400">
                  {attendancePercent}%
                </p>
              </div>

              <CalendarDays className="h-7 w-7 text-emerald-400" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Average Marks</p>

                <p className="text-4xl font-bold mt-2 text-amber-400">
                  {averageMarks}
                </p>
              </div>

              <Trophy className="h-7 w-7 text-amber-400" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Enrolled Courses</p>

                <p className="text-4xl font-bold mt-2 text-indigo-400">
                  {courses.length}
                </p>
              </div>

              <BookOpen className="h-7 w-7 text-indigo-400" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Batch</p>

                <p className="text-xl font-bold mt-2 text-purple-400">
                  {batch?.batch || "N/A"}
                </p>
              </div>

              <GraduationCap className="h-7 w-7 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Batch Info */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-400" />
            Academic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-slate-300">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-slate-400 text-sm">Batch</p>
              <p className="font-medium mt-1">{batch?.batch || "N/A"}</p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-slate-400 text-sm">Department</p>
              <p className="font-medium mt-1">{batch?.department || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Latest Grades */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            Latest Grades
          </h2>

          <div className="space-y-3">
            {latestGrades.length === 0 ? (
              <p className="text-slate-400">No grades available.</p>
            ) : (
              latestGrades.map((grade) => (
                <div
                  key={grade.id}
                  className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{grade.subject}</p>

                    <p className="text-sm text-slate-400">
                      Grade: {grade.grade}
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-300 border border-amber-500/20">
                    {grade.marks}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Courses */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            My Courses
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {courses.length === 0 ? (
              <p className="text-slate-400">No enrolled courses found.</p>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl bg-slate-800 p-4 border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300 border border-indigo-500/20">
                      {course.code}
                    </span>
                  </div>

                  <p className="font-semibold">{course.name}</p>

                  <p className="text-sm text-slate-400 mt-1">
                    {course.instructor}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-400" />
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/dashboard"
              className="rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition-colors"
            >
              Dashboard
            </a>

            <a
              href="/attendance"
              className="rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition-colors"
            >
              Attendance
            </a>

            <a
              href="/grades"
              className="rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition-colors"
            >
              Grades
            </a>

            <a
              href="/course"
              className="rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition-colors"
            >
              Courses
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- ADMIN / FACULTY HOME ----------------
  return (
    <div className="max-w-7xl mx-auto p-6 text-white space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-8 shadow-2xl">
        <h1 className="text-4xl font-bold">Welcome to CampusHub 🚀</h1>

        <p className="mt-3 text-slate-300 text-lg max-w-3xl">
          Manage students, attendance, grades, batches, and courses from one
          unified dashboard.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <a
          href="/students"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-indigo-500/40 transition-colors"
        >
          <Users className="h-8 w-8 text-indigo-400 mb-4" />
          <p className="font-semibold text-lg">Students</p>
          <p className="text-slate-400 text-sm mt-1">Manage student records</p>
        </a>

        <a
          href="/attendance"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-emerald-500/40 transition-colors"
        >
          <CalendarDays className="h-8 w-8 text-emerald-400 mb-4" />
          <p className="font-semibold text-lg">Attendance</p>
          <p className="text-slate-400 text-sm mt-1">
            Mark and track attendance
          </p>
        </a>

        <a
          href="/grades"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-amber-500/40 transition-colors"
        >
          <Trophy className="h-8 w-8 text-amber-400 mb-4" />
          <p className="font-semibold text-lg">Grades</p>
          <p className="text-slate-400 text-sm mt-1">
            Manage student performance
          </p>
        </a>

        <a
          href="/course"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-purple-500/40 transition-colors"
        >
          <BookOpen className="h-8 w-8 text-purple-400 mb-4" />
          <p className="font-semibold text-lg">Courses</p>
          <p className="text-slate-400 text-sm mt-1">View and manage courses</p>
        </a>
      </div>
    </div>
  );
}

export default Home;
