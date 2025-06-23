const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const loansRoutes = require('./routes/loans');
const reportRoutes = require("./routes/reports");
const dashboardRoutes = require("./routes/dashboard");
const memberRoutes = require("./routes/member");
const bookRoutes = require("./routes/books");
const copyRoutes = require("./routes/copy"); 

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/loans", loansRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/copies", copyRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// for error handling 

// app.use((err, req, res, next) => {
//   console.error("Global error:", err.stack);
//   res.status(500).send("Something broke!");
// });
