import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    ObjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);

export { Like };
