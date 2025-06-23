const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LIBRARIAN_EMAIL = "librarian@library.com";
const LIBRARIAN_PASSWORD_HASH = "$2b$10$iSQeKlj4ItysNL9prvTj3.tJaHKXXjJYo1Fpe8jeCvVLctBg8jg8y";


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== LIBRARIAN_EMAIL) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, LIBRARIAN_PASSWORD_HASH);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ role: "librarian" }, "your_jwt_secret", {
    expiresIn: "1d",
  });

  res.json({ token });
});

module.exports = router;