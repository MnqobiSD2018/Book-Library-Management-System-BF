const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const Loan = require("../models/Loan");

async function checkMemberHasLoansOrFines(memberId) {
  const activeLoans = await Loan.find({ memberId, returnDate: null });
  return activeLoans.length > 0;
}

// GET all members
router.get("/", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

// ADD a new member
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({message: "All fields required."})
    }

    const exists = await Member.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return res.status(400).json({ message: "Email or phone already exists." });
    }

    const newMember = new Member({ fullName, email, phone });
    await newMember.save();

    res.status(201).json(newMember);
  } catch (error) {
    console.error("POST /api/member error:", error);
    res.status(500).json({message: "Server error."});
  }

});

// UPDATE member
router.put("/:id", async (req, res) => {
  const { fullName, email, phone } = req.body;

  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: "Member not found" });

  // check for email/phone duplicates (excluding current)
  const exists = await Member.findOne({
    $and: [
      { _id: { $ne: req.params.id } },
      { $or: [{ email }, { phone }] },
    ],
  });
  if (exists) return res.status(400).json({ message: "Email or phone already exists." });

  member.fullName = fullName;
  member.email = email;
  member.phone = phone;

  await member.save();
  res.json(member);
});

// INACTIVATE member
router.put("/:id/inactivate", async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: "Member not found" });

  // Check for active loans or unpaid fines
  const hasPending = await checkMemberHasLoansOrFines(member._id); // implement this
  if (hasPending) {
    return res.status(400).json({ message: "Cannot inactivate: active loans or unpaid fines" });
  }

  member.status = "Inactive";
  await member.save();
  res.json({ message: "Member inactivated" });
});

module.exports = router;
