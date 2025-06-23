const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  copyId: { type: mongoose.Schema.Types.ObjectId, ref: "Copy", required: true },
  checkoutDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  fine: {
    amount: { type: Number, default: 0 },
    status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
    dueDate: { type: Date },
  }
});

module.exports = mongoose.model("Loan", loanSchema);
