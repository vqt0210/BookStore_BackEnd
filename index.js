const express = require("express");
const cors = require("cors");
const axios = require("axios");
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

// Endpoint to handle form submissions (where the CAPTCHA response is sent)
app.post("/api/submit", async (req, res) => {
  const captchaResponse = req.body.captchaResponse; // This is the token sent from the front-end

  // Cloudflare Turnstile verification
  try {
    const response = await axios.post("https://challenges.cloudflare.com/turnstile/v0/siteverify", null, {
      params: {
        secret: process.env.CLOUDFLARE_SECRET_KEY, // Use the secret key from .env
        response: captchaResponse, // The CAPTCHA response sent by the client
      },
    });

    if (response.data.success) {
      // CAPTCHA verification passed
      res.status(200).send("CAPTCHA verified successfully");
    } else {
      // CAPTCHA verification failed
      res.status(400).send("CAPTCHA verification failed");
    }
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    res.status(500).send("Internal server error");
  }
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
