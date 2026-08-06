const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

const router = express.Router()

const JWT_SECRET = 'campushub_secret_key'

// REGISTER
router.post('/register', async (req, res) => {
try {
const { name, email, password, role } = req.body


// Check if user already exists
const [existing] = await db.query(
  'SELECT * FROM users WHERE email = ?',
  [email]
)

if (existing.length > 0) {
  return res.status(400).json({
    message: 'Email already registered',
  })
}

// Hash password
const hashedPassword = await bcrypt.hash(password, 10)

// Insert user
await db.query(
  'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
  [name, email, hashedPassword, role || 'faculty']
)

res.status(201).json({
  message: 'User registered successfully',
})


} catch (error) {
res.status(500).json({
error: error.message,
})
}
})

// LOGIN
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body


const [users] = await db.query(
  'SELECT * FROM users WHERE email = ?',
  [email]
)

if (users.length === 0) {
  return res.status(400).json({
    message: 'Invalid email or password',
  })
}

const user = users[0]

const isMatch = await bcrypt.compare(password, user.password)

if (!isMatch) {
  return res.status(400).json({
    message: 'Invalid email or password',
  })
}

const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
    email: user.email,
  },
  JWT_SECRET,
  { expiresIn: '1d' }
)

res.json({
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
})


} catch (error) {
res.status(500).json({
error: error.message,
})
}
})

module.exports = router
