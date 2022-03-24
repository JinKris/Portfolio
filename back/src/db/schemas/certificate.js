import { Schema, model } from "mongoose";

const certificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    whenDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const certificateModel = model("Certificate", certificateSchema);

export { certificateModel };
