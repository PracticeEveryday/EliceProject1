import mongoose from "mongoose";

const awardSchema = new mongoose.Schema({
  awardId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Award = mongoose.model("Award", awardSchema);

export { Award };
