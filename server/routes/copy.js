const express = require("express");
const router = express.Router();
const Copy = require("../models/Copy");
const Book = require("../models/Book");


// GET all copies
router.get("/", async (req, res) => {
  try {
    const copies = await Copy.find();
    res.json(copies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch copies." });
  }
});

// GET available copies
router.get("/available", async (req, res) => {
  try {
    const availableCopies = await Copy.find({ status: "Available" });
    res.json(availableCopies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch available copies." });
  }
});


// POST: Add a new copy to a book by ISBN
router.post("/:isbn/", async (req, res) => {
  const { isbn } = req.params;
  const { copyId, status } = req.body;

  try {

    if (!copyId) return res.status(400).json({ message: "copyId is required" });
    if (!status) return res.status(400).json({ message: "status is required" });

    // Check if copy ID already exicsts
    const existingCopy = await Copy.findOne({ copyId });
    if (existingCopy) {
      return res.status(400).json({ message: "Copy ID already exists." });
    }

    // Fetch the book by ISBN
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    // Create a new copy
    const newCopy = new Copy({ 
      copyId, 
      status, 
      isbn, 
      bookTitle: book.title });

    await newCopy.save();

    res.status(201).json({ message: "Copy added successfully.", copy: newCopy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add copy." });
  }
});


module.exports = router;