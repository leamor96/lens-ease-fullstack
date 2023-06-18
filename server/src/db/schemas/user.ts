import mongoose, { Schema } from "mongoose";
import { lensSchema } from "./lens.js";
import { proLensSchema } from "./proLens.js";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // roles: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Role",
  //   },
  // ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // favorites: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Favorite",
  //   },
  // ],
  favoritesLens: [lensSchema],
  favoritesProLens: [proLensSchema],
});

export { userSchema };
