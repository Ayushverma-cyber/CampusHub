const express = require('express')
const db = require('../db')

const router = express.Router()

// Get all courses
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courses')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch courses' })
  }
})

// Add new course
router.post('/', async (req, res) => {
  const { code, name, instructor } = req.body

  try {
    const [result] = await db.query(
      'INSERT INTO courses (code, name, instructor) VALUES (?, ?, ?)',
      [code, name, instructor]
    )

    res.status(201).json({
      message: 'Course created successfully',
      id: result.insertId,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create course' })
  }
})

module.exports = router