const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params

    const [rows] = await db.query(
      `SELECT
         attendance.id,
         attendance.date,
         attendance.status,
         students.name,
         students.roll_no
       FROM attendance
       JOIN students ON attendance.student_id = students.id
       WHERE students.email = ?
       ORDER BY attendance.date DESC`,
      [email]
    )

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch attendance' })
  }
})

module.exports = router