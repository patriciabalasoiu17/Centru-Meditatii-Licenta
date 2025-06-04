// models/GroupModel.js
import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
    students: {
      type: [String],
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", GroupSchema);

export default Group;
