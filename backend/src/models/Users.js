import mongoose from "mongoose";

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username field, required and unique
  password: { type: String, required: true }, // Password field required
  savedRecipes:[{type:mongoose.Schema.Types.ObjectId,ref:"recipes"}]
});

// Create and export the User model based on the schema
export const UserModel = mongoose.model("users", UserSchema);
