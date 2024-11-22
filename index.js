const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { swaggerUi, swaggerSpec } = require("./swagger"); // Import Swagger configuration

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

// Routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base route
app.use("/", (req, res) => {
  res.send(`Book Store Server is running !`);
});

// Database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));


module.exports = app;
