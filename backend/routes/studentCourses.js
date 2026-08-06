const express = require('express')
const db = require('../db')

const router = express.Router()

// Get courses for a student by email
router.get('/:email', async (req, res) => {
try {
const { email } = req.params


const [rows] = await db.query(
  `SELECT courses.id, courses.code, courses.name, courses.instructor
   FROM enrollments
   JOIN courses ON enrollments.course_id = courses.id
   WHERE enrollments.student_email = ?`,
  [email]
)

res.json(rows)


} catch (error) {
console.error(error)
res.status(500).json({ error: 'Failed to fetch student courses' })
}
})

module.exports = router
