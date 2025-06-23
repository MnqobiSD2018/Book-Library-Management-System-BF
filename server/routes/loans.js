const express = require("express");
const router = express.Router();
const Loan = require("../models/Loan");
const Copy = require("../models/Copy");
const Member = require("../models/Member");

// GET all members
router.get("/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch members." });
  }
});

// GET all copies
router.get("/copies", async (req, res) => {
  try {
    const copies = await Copy.find();
    res.json(copies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch copies." });
  }
});

// GET all loans
router.get("/loans", async (req, res) => {
  try {
    const loans = await Loan.find()
    .populate("memberId", "fullName")
    .populate({
      path: "copyId",
      select: "copyId bookTitle status"
    });
     
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch loans." });
  }
});

// POST: Checkout a copy
router.post("/checkout", async (req, res) => {
  const { memberId, copyId } = req.body;
  
  try {
    const copy = await Copy.findById( copyId );
    

    if (!copy || copy.status !== "Available") {
      return res.status(400).json({ message: "Copy is not available." });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const loan = await Loan.create({
      memberId,
      copyId: copy._id,
      dueDate,
    });

    copy.status = "Borrowed";
    await copy.save();

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// PUT: Return a copy
router.put("/loans/return/:loanId", async (req, res) => {
  const { loanId } = req.params;

  try {
    const loan = await Loan.findById(loanId).populate("copyId");

    if (!loan || loan.returnDate) {
      return res.status(400).json({ message: "Invalid loan or already returned." });
    }

    const returnDate = new Date();
    const dueDate = new Date(loan.dueDate);

    loan.returnDate = returnDate;

    const overdueDays = Math.ceil((returnDate - loan.dueDate) / (1000 * 60 * 60 * 24));

     if (overdueDays > 0) {
      loan.fine.amount = overdueDays;
      loan.fine.status = "Unpaid";
      loan.fine.dueDate = returnDate;
    } else {
      loan.fine.amount = 0;
      loan.fine.status = "Paid";
      loan.fine.dueDate = null;

    }

    const copy = await Copy.findById(loan.copyId._id);
      if (copy) {
        copy.status = "Available";
        await copy.save();
      }
    
    await loan.save();

    res.json({ message: "Book returned successfully", loan });
  } catch (error) {
    res.status(500).json({ message: "Failed to return loan." });
  }
});


module.exports = router;
