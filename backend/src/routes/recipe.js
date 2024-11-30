import { RecipeModel } from "../models/Recipe.js";
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

//get recipe
router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//create new recipe
router.post("/",verifyToken, async (req, res) => {
  const newRecipe = new RecipeModel(req.body);
  try {
    const response = await newRecipe.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//save recipe
router.put("/", verifyToken,async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save() //save the changes
    res.status(200).json({savedRecipes:user.savedRecipes});
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//get recipes saved by the user given id
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    res.json({savedRecipes:user?.savedRecipes});
  } catch (error) {
    console.log(error);
    res.json(error)
  }
})
//display all saved recipes
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

export { router as recipesRouter };
