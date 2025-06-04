// models/ClassEventModel.js
import mongoose, { Schema } from "mongoose";

const ClassEventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ClassEvent = mongoose.model("ClassEvent", ClassEventSchema);

export default ClassEvent;
