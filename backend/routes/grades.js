const express = require('express')
const db = require('../db')

const router = express.Router()

// Helper: calculate grade
function calculateGrade(marks) {
if (marks >= 90) return 'A+'
if (marks >= 80) return 'A'
if (marks >= 70) return 'B'
if (marks >= 60) return 'C'
if (marks >= 50) return 'D'
return 'F'
}

// GET all grades
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT g.*, s.name, s.roll_no, s.email
       FROM grades g
       JOIN students s ON g.student_id = s.id`
    )

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch grades' })
  }
})
// ADD grade
router.post('/', async (req, res) => {
try {
const { student_id, subject, marks } = req.body


const grade = calculateGrade(Number(marks))

await db.query(
  'INSERT INTO grades (student_id, subject, marks, grade) VALUES (?, ?, ?, ?)',
  [student_id, subject, marks, grade]
)

res.status(201).json({
  message: 'Grade added successfully',
})


} catch (error) {
res.status(500).json({ error: error.message })
}
})

// UPDATE grade
router.put('/:id', async (req, res) => {
try {
const { subject, marks } = req.body


const grade = calculateGrade(Number(marks))

await db.query(
  'UPDATE grades SET subject=?, marks=?, grade=? WHERE id=?',
  [subject, marks, grade, req.params.id]
)

res.json({
  message: 'Grade updated successfully',
})


} catch (error) {
res.status(500).json({ error: error.message })
}
})

// DELETE grade
router.delete('/:id', async (req, res) => {
try {
await db.query(
'DELETE FROM grades WHERE id = ?',
[req.params.id]
)


res.json({
  message: 'Grade deleted successfully',
})


} catch (error) {
res.status(500).json({ error: error.message })
}
})

module.exports = router
