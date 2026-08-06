const express = require('express')
const router = express.Router()
const db = require('../db')

// GET all students
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM students ORDER BY id DESC'
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST create student
router.post('/', async (req, res) => {
  try {
    const {
      name,
      roll_no,
      email,
      batch,
      department,
      year,
    } = req.body

    const [result] = await db.query(
      'INSERT INTO students (name, roll_no, email, batch, department, year) VALUES (?, ?, ?, ?, ?, ?)',
      [name, roll_no, email, batch, department, year]
    )

    res.status(201).json({
      message: 'Student created successfully',
      id: result.insertId,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM students WHERE id = ?', [
      req.params.id,
    ])

    res.json({ message: 'Student deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// UPDATE student
router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      roll_no,
      email,
      batch,
      department,
      year,
    } = req.body

    await db.query(
      'UPDATE students SET name=?, roll_no=?, email=?, batch=?, department=?, year=? WHERE id=?',
      [
        name,
        roll_no,
        email,
        batch,
        department,
        year,
        req.params.id,
      ]
    )

    res.json({ message: 'Student updated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ---------------- STUDENT APIs ----------------

// Student batch
router.get('/student-batch/:email', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT batch, department, year
       FROM students
       WHERE email = ?`,
      [req.params.email]
    )

    res.json(rows[0] || {})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Student attendance
router.get('/student-attendance/:email', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.*, s.name, s.roll_no
       FROM attendance a
       JOIN students s ON a.student_id = s.id
       WHERE s.email = ?
       ORDER BY a.date DESC`,
      [req.params.email]
    )

    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Student grades
router.get('/student-grades/:email', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT g.*, s.name, s.roll_no, s.email
       FROM grades g
       JOIN students s ON g.student_id = s.id
       WHERE s.email = ?
       ORDER BY g.id DESC`,
      [req.params.email]
    )

    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Student courses
router.get('/student-courses/:email', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.*
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE e.student_email = ?`,
      [req.params.email]
    )

    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router