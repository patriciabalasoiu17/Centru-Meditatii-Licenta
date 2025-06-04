import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  value: { type: Number, required: true, min: 1, max: 10 },
  date: { type: Date, default: Date.now },
  description: { type: String }, 
});

export default mongoose.model("Grade", GradeSchema);
