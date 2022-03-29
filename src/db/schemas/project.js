import { Schema, model } from "mongoose";

const projectShcema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
});

const Project = model("Project", projectShcema);

export { Project };
