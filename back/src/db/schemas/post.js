import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const postSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    writeUser: {
      type: String,
      required: true,
    },
    context: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = model("Post", postSchema);

export { postModel };
