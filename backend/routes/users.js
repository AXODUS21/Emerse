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

router.get("/:userID", async (req, res) => {
  const { userID } = req.params; // Get the user ID from the request parameters

  try {
    const user = await UserModel.findById(userID); // Find the user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send the user as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//getting the cart of the user
router.get("/cart/:userID", async (req, res) => {
  const { userID } = req.params; // Get the user ID from the request parameters
  try {
    const user = await UserModel.findById(userID); // Find the user by ID
    res.json(user.userCart); // Send the user as a JSON response
  } catch (error) {
    console.log(error);
  }
})


export { router as userRouter };