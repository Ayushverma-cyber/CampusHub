
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all students
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM students ORDER BY id DESC'
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

// CREATE student
router.post('/', async (req, res) => {
  try {
    const { name, roll_no, email, batch, department, year } = req.body;

    if (!name || !roll_no || !email) {
      return res.status(400).json({
        message: 'Name, roll number and email are required'
      });
    }

    const [result] = await db.query(
      `INSERT INTO students
      (name, roll_no, email, batch, department, year)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, roll_no, email, batch, department, year]
    );

    res.status(201).json({
      message: 'Student created successfully',
      id: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(error.code === 'ER_DUP_ENTRY' ? 409 : 500).json({
      message: error.code === 'ER_DUP_ENTRY'
        ? 'Student email or roll number already exists'
        : 'Failed to create student'
    });
  }
});

// UPDATE student
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const { name, roll_no, email, batch, department, year } = req.body;

    if (!name || !roll_no || !email) {
      return res.status(400).json({
        message: 'Name, roll number and email are required'
      });
    }

    const [result] = await db.query(
      `UPDATE students
       SET name=?, roll_no=?, email=?, batch=?, department=?, year=?
       WHERE id=?`,
      [name, roll_no, email, batch, department, year, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update student' });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const [result] = await db.query(
      'DELETE FROM students WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete student' });
  }
});

// STUDENT BATCH
router.get('/student-batch/:email', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT batch, department, year
       FROM students WHERE email = ?`,
      [req.params.email]
    );

    res.json(rows[0] || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch student batch' });
  }
});

// STUDENT ATTENDANCE
router.get('/student-attendance/:email', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.*, s.name, s.roll_no
       FROM attendance a
       JOIN students s ON a.student_id = s.id
       WHERE s.email = ?
       ORDER BY a.date DESC`,
      [req.params.email]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch attendance' });
  }
});

// STUDENT GRADES
router.get('/student-grades/:email', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT g.*, s.name, s.roll_no, s.email
       FROM grades g
       JOIN students s ON g.student_id = s.id
       WHERE s.email = ?
       ORDER BY g.id DESC`,
      [req.params.email]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch grades' });
  }
});

// STUDENT COURSES
router.get('/student-courses/:email', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.*
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE e.student_email = ?`,
      [req.params.email]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

module.exports = router;
