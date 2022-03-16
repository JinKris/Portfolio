import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    id : {
        type : Number,
        required : true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("Education", EducationSchema);

export { UserModel };