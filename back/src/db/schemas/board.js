import { Schema, model } from "mongoose";

const boardSchema = new Schema(
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

const boardModel = model("Post", boardSchema);

export { boardModel };
