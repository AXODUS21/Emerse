import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { productRouter } from "./routes/products.js";
import { userRouter } from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(
  cors({
    origin: "https://emerse.netlify.app/", // Allow requests from Netlify domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers for cross-origin requests
    credentials: true, // Enable cookies and authentication headers (if needed)
  })
);

app.use(express.json());
app.use("/products", productRouter);
app.use("/users", userRouter);

// API route for PayPal client ID
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// MongoDB connection and server start
mongoose
  .connect(process.env.MONGODB_CONNECTION_KEY)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
