const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware

// Middleware to handle CORP and COEP
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");  
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");  
  next();
});

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

app.use(express.json());

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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export Express app for serverless deployment
module.exports = app;
