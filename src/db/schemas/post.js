import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  writeUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tagUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  context: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

export { Post };
