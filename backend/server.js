const express = require('express')
const cors = require('cors')
const db = require('./db')
const studentRoutes = require('./routes/students')
const authRoutes = require('./routes/auth')
const attendanceRoutes = require('./routes/attendance')
const gradeRoutes = require('./routes/grades')
const batchRoutes = require('./routes/batches')
const studentCourseRoutes = require('./routes/studentCourses')
const studentAttendanceRoutes = require('./routes/studentAttendance')
const studentGradesRoutes = require('./routes/studentGrades')
const studentBatchRoutes = require('./routes/studentBatch')
const courseRoutes = require('./routes/courses')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/grades', gradeRoutes)
app.use('/api/batches', batchRoutes)
app.use('/api/student-courses', studentCourseRoutes)
app.use('/api/student-attendance', studentAttendanceRoutes)
app.use('/api/student-grades', studentGradesRoutes)
app.use('/api/student-batch', studentBatchRoutes)
app.use('/api/courses', courseRoutes)
app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result')

    res.json({
      message: 'CampusHub Backend Running',
      database: rows[0].result,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
})

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [[students]] = await db.query(
      'SELECT COUNT(*) AS total FROM students'
    )

    const [[batches]] = await db.query(
      'SELECT COUNT(*) AS total FROM batches'
    )

    const [[attendance]] = await db.query(
      'SELECT COUNT(*) AS total FROM attendance'
    )

    const [[grades]] = await db.query(
      'SELECT COUNT(*) AS total FROM grades'
    )

    res.json({
      students: students.total,
      batches: batches.total,
      attendance: attendance.total,
      grades: grades.total,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load dashboard stats' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})