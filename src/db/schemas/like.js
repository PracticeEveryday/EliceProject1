import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    pushedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pushUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);

export { Like };
