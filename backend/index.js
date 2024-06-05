import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { productRouter } from "./routes/products.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use("/products", productRouter)

mongoose
  .connect(
    "mongodb+srv://lubiaxellerosh:Axellerosh21@emmerse.1tw437q.mongodb.net/EmmerseDB"
  )
  .then(() => {
    console.log("MongoDB connected")
    app.listen(5000, () => {
      console.log("listening on localhost 5000");
    });
});

