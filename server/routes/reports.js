const express = require("express");
const router = express.Router();
const Loan = require("../models/Loan");
const Member = require("../models/Member");

// GET: Active Loans Report
router.get("/active-loans", async (req, res) => {
  try {
    const loans = await Loan.find({ returnDate: null })
    .populate("memberId", "fullName")
    .populate("copyId");

    const today = new Date();

    const report = loans.map((loan) => ({
      bookTitle: loan.copyId?.bookTitle || "Unknown",
      memberName: loan.memberId?.fullName || "Unknown",
      dueDate: loan.dueDate,
      isOverdue: loan.dueDate < today,
    }));

    res.json(report);
  } catch (error) {
    console.error("Error fetching active loans:", err);
    res.status(500).json({ error: "Server error while fetching active loans." });
  }
});

// GET: Member History
router.get("/member-history/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;

    const loans = await Loan.find({ memberId })
      .populate("copyId");

    const history = loans.map((loan) => ({
      bookTitle: loan.copyId?.bookTitle || "Unknown",
      checkoutDate: loan.checkoutDate,
      dueDate: loan.dueDate,
      returnDate: loan.returnDate,
      fine: loan.fine,
    }));

    res.json(history);
    
  } catch (error) {
    console.error("Error in /active-loans:", error);
    res.status(500).json({ error: "Internal Server Error while fetching active loans" });
  }
});

module.exports = router;
