import { Schema, model } from "mongoose";

const educationSchema = new Schema({
  educationId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  toDate: {
    type: String,
    required: true,
  },
});

const Education = model("Education", educationSchema);

export { Education };
