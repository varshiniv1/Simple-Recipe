//admin
//admin123;
//mongodb+srv://admin:admin123@cluster0.8nxtrjz.mongodb.net/

//mongodb+srv://admin:admin123@cluster0.8nxtrjz.mongodb.net/

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import {userRouter} from './routes/users.js'
import { recipesRouter } from './routes/recipe.js'

const app = express()
dotenv.config();
app.use(express.json())
app.use(cors())

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/auth", userRouter);
app.use("/api/recipes", recipesRouter)


const PORT = 4000;

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await connect();
});