import { Schema } from "mongoose";

// Define a schema for lens options
const lensSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  index: {
    type: String,
    required: true,
  },
  diameter: {
    type: String,
    required: true,
  },
  minusRange: {
    type: String,
    required: true,
  },
  plusRange: {
    type: String,
    required: true,
  },
  coating: {
    type: String,
    enum: ["none", "anti-reflective", "scratch-resistant"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export {lensSchema};