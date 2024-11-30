import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/Users.js";
import dotenv from 'dotenv'

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1000d" }
    );

    res.status(200).json({ token,userID:user._id });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as userRouter };

export const verifyToken=(req,res,next)=>{
  const token=req.headers.authorization
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (error)=>{
      if(error) return res.sendStatus(403)
      next()
    })
  }
  else{
    res.sendStatus(401)
  }
}