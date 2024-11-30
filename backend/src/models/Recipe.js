import mongoose from "mongoose";

// Define the user schema
const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type:{ type: String, required: true},
  desc:{type: String, required: true},
  ingredients: [{ type: String, required: true }], //array of strings
  instructions: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

// Create and export the User model based on the schema
export const RecipeModel = mongoose.model("recipe", RecipeSchema);
