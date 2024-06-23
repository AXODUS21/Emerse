import { UserModel } from "../models/user.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    //detects the username in the database
    //if it finds one then that person becomes the user variable
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.json({ message: "user already exist!" });
    }
    //makes it so that the password is hashed (gonna be random shit)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "You Have Been Registered Succesfully" });
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "user does not exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Wrong password dumbass" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };