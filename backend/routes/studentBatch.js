const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/:email', async (req, res) => {
try {
const { email } = req.params


const [rows] = await db.query(
  'SELECT batch, department FROM students WHERE email = ?',
  [email]
)

if (rows.length === 0) {
  return res.json({})
}

res.json(rows[0])


} catch (error) {
console.error(error)
res.status(500).json({ error: 'Failed to fetch batch' })
}
})

module.exports = router
