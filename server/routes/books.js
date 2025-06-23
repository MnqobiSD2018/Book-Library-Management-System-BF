const express = require('express');
const Book = require('../models/Book');
const Copy = require("../models/Copy");
const router = express.Router();

// Create new book metadata
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error("error saving: ", err)
    res.status(400).json({ error: err.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET available copies
router.get('/available-copies', async (req, res) => {
  try {
    const books = await Book.find({
      'copies.status': 'Available'
    });

    const availableBooks = books.map(book => {
      const availableCopies = book.copies.filter(copy => copy.status === 'Available');
      return {
        isbn: book.isbn,
        title: book.title,
        availableCopies,
      };
    }).filter(book => book.availableCopies.length > 0); // Remove books with no copies left after filtering

    res.json(availableBooks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available copies." });
  }
});

// Delete metadata (only if no copies)
router.delete('/:isbn', async (req, res) => {
  
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const existingCopies = await Copy.find({ isbn: req.params.isbn });
    if (existingCopies.length > 0) {
      return res.status(400).json({ error: 'Cannot delete book with copies' });
    }

    await Book.deleteOne({ isbn: req.params.isbn });
    res.json({ message: 'Deleted' });
  } catch (error) {
    
  }
  
});

module.exports = router;
