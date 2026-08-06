const express = require('express')
const router = express.Router()
const db = require('../db')

// GET all batches
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM batches ORDER BY created_at DESC'
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch batches' })
  }
})

// CREATE batch
router.post('/', async (req, res) => {
  try {
    const { name, department, year } = req.body

    const [result] = await db.query(
      'INSERT INTO batches (name, department, year) VALUES (?, ?, ?)',
      [name, department, year]
    )

    res.status(201).json({
      message: 'Batch created',
      id: result.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create batch' })
  }
})

// UPDATE batch
router.put('/:id', async (req, res) => {
  try {
    const { name, department, year } = req.body

    await db.query(
      'UPDATE batches SET name=?, department=?, year=? WHERE id=?',
      [name, department, year, req.params.id]
    )

    res.json({ message: 'Batch updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update batch' })
  }
})

// DELETE batch
router.delete('/:id', async (req, res) => {
  try {
    await db.query(
      'DELETE FROM batches WHERE id=?',
      [req.params.id]
    )

    res.json({ message: 'Batch deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete batch' })
  }
})

module.exports = router