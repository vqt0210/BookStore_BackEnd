const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-store-front-end-ivory.vercel.app",
      "https://www.teasonmike.io.vn",
      "https://book-store-front-end-git-main-vqtees-projects.vercel.app/",
    ],
    credentials: true,
  })
);

// Set the Cross-Origin-Opener-Policy header
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); // or 'unsafe-none'
  next();
});

// Routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Base route
app.use("/", (req, res) => {
  res.send(`Book Store Server is running !`);
});

// Database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));

// Export Express app for serverless deployment
module.exports = app;
