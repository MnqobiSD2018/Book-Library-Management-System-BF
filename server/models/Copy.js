const mongoose = require("mongoose");

const copySchema = new mongoose.Schema({
  copyId: { type: String, required: true, unique: true },
  status: { type: String, enum: ["Available", "Borrowed", "Lost"], default: "Available" },
  isbn: { type: String, required: true },
  bookTitle: { type: String, required: true }, 
  
});

module.exports = mongoose.model("Copy", copySchema);
