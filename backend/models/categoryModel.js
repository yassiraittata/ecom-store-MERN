import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: 32,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Categories", categorySchema);
