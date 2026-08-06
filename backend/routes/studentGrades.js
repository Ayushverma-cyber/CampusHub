const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/:email', async (req, res) => {
try {
const { email } = req.params


const [studentRows] = await db.query(
  'SELECT id FROM students WHERE email = ?',
  [email]
)

if (studentRows.length === 0) {
  return res.json([])
}

const studentId = studentRows[0].id

const [rows] = await db.query(
  'SELECT * FROM grades WHERE student_id = ? ORDER BY created_at DESC',
  [studentId]
)

res.json(rows)

} catch (error) {
console.error(error)
res.status(500).json({ error: 'Failed to fetch grades' })
}
})

module.exports = router
