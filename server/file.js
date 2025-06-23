// scripts/seedCopies.js
const mongoose = require("mongoose");
const Copy = require("./models/Copy");

mongoose.connect("mongodb://localhost:27017/library");

(async () => {
  await Copy.deleteMany({});
  await Copy.insertMany([
    { copyId: "COPY001", status: "Available", isbn: "978-1234567890" },
    { copyId: "COPY002", status: "Borrowed", isbn: "978-1234567890" },
    { copyId: "COPY003", status: "Available", isbn: "978-0987654321" },
  ]);
  console.log("Sample copies added.");
  process.exit();
})();
