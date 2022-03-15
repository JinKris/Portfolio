import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
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
    when_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // 필요 여부는 확실치 않으나 userSchema에도 있어서 일단 추가했습니다.
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
