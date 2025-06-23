const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Member = require("../models/Member");
const Loan = require("../models/Loan");
const Copy = require("../models/Copy");

// GET /api/dashboard/summary
router.get("/summary", async (req, res) => {
  const [bookCount, memberCount, activeLoans, totalLoans, totalFines] = await Promise.all([
    Book.countDocuments(),
    Member.countDocuments(),
    Loan.countDocuments({ returnDate: null }),
    Loan.countDocuments(),
    Loan.aggregate([
      { $match: { "fine.amount": { $gt: 0 } } },
      { $group: { _id: null, total: { $sum: "$fine.amount" } } }
    ]),
  ]);

  res.json({
    bookCount,
    memberCount,
    activeLoans,
    totalLoans,
    totalFines: totalFines[0]?.total || 0
  });
});

module.exports = router;
