const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: String,
  author: String,
  publisher: String,
  year: Number,
  genre: String,
});

module.exports = mongoose.model('Book', bookSchema);
