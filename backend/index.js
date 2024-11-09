import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { productRouter } from "./routes/products.js"
import { userRouter } from "./routes/users.js"

const app = express()
const PORT = process.env.PORT || 5000
const allowedOrigin = process.env.CORS_ORIGIN || 'https://emerse.netlify.app';

dotenv.config();

app.use(express.json())
app.use(cors({
  origin: allowedOrigin,
  credentials: true // Set to true if you need cookies/authentication
}));
app.use("/products", productRouter)
app.use("/users", userRouter)
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
mongoose.connect(process.env.MONGODB_CONNECTION_KEY).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`listening on localhost ${PORT}`);
  });
});

