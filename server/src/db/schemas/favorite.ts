import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lens: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lens",
  },
});

export {favoriteSchema};