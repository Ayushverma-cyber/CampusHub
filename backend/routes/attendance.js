const express = require('express')
const db = require('../db')

const router = express.Router()

// GET all attendance records
router.get('/', async (req, res) => {
try {
const [rows] = await db.query(`       SELECT
        attendance.id,
        attendance.date,
        attendance.status,
        students.id AS student_id,
        students.name,
        students.roll_no
      FROM attendance
      JOIN students ON attendance.student_id = students.id
      ORDER BY attendance.date DESC
    `)


res.json(rows)


} catch (error) {
res.status(500).json({ error: error.message })
}
})

// MARK attendance
router.post('/', async (req, res) => {
try {
const { student_id, date, status } = req.body


await db.query(
  'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
  [student_id, date, status]
)

res.status(201).json({
  message: 'Attendance marked successfully',
})


} catch (error) {
res.status(500).json({ error: error.message })
}
})

// DELETE attendance record
router.delete('/:id', async (req, res) => {
try {
await db.query(
'DELETE FROM attendance WHERE id = ?',
[req.params.id]
)


res.json({
  message: 'Attendance deleted successfully',
})


} catch (error) {
res.status(500).json({ error: error.message })
}
})

module.exports = router
