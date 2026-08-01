const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/books - list all books (supports ?search=)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let sql = 'SELECT * FROM books';
    const params = [];

    if (search) {
      sql += ' WHERE title ILIKE $1 OR author ILIKE $1';
      params.push(`%${search}%`);
    }

    sql += ' ORDER BY created_at DESC';

    const { rows } = await pool.query(sql, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// GET /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// POST /api/books - create a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, isbn, copies } = req.body;

    if (!title || !author) {
      return res.status(400).json({ success: false, message: 'Title and author are required' });
    }

    const copiesNum = Number(copies) > 0 ? Number(copies) : 1;

    const { rows } = await pool.query(
      `INSERT INTO books (title, author, genre, isbn, copies, available)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, author, genre || 'General', isbn || '', copiesNum, copiesNum]
    );

    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// PUT /api/books/:id - update a book
router.put('/:id', async (req, res) => {
  try {
    const { title, author, genre, isbn, copies, available } = req.body;
    const id = req.params.id;

    const { rows: existingRows } = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    const existing = existingRows[0];

    const updated = {
      title: title ?? existing.title,
      author: author ?? existing.author,
      genre: genre ?? existing.genre,
      isbn: isbn ?? existing.isbn,
      copies: copies !== undefined ? Number(copies) : existing.copies,
      available: available !== undefined ? Number(available) : existing.available
    };

    const { rows } = await pool.query(
      `UPDATE books SET title = $1, author = $2, genre = $3, isbn = $4, copies = $5, available = $6
       WHERE id = $7 RETURNING *`,
      [updated.title, updated.author, updated.genre, updated.isbn, updated.copies, updated.available, id]
    );

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM books WHERE id = $1', [req.params.id]);
    if (rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// PATCH /api/books/:id/checkout
router.patch('/:id/checkout', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Book not found' });

    const book = rows[0];
    if (book.available <= 0) {
      return res.status(400).json({ success: false, message: 'No copies available' });
    }

    const { rows: updatedRows } = await pool.query(
      'UPDATE books SET available = available - 1 WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    res.json({ success: true, data: updatedRows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// PATCH /api/books/:id/return
router.patch('/:id/return', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Book not found' });

    const book = rows[0];
    if (book.available >= book.copies) {
      return res.status(400).json({ success: false, message: 'All copies already returned' });
    }

    const { rows: updatedRows } = await pool.query(
      'UPDATE books SET available = available + 1 WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    res.json({ success: true, data: updatedRows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

// DELETE /api/books - not exposed; kept explicit per-id only for safety

module.exports = router;
