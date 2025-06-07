import mongoose from "mongoose";

const AbsenceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  classEventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassEvent",
    required: true
  },
  date: { type: Date, required: true },
  reason: { type: String },
});

export default mongoose.model("Absence", AbsenceSchema);
