import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name: String,
  understanding: String,
  exercises: String,
});

const GapSchema = new mongoose.Schema({
  classLevel: String,
  topic: String,
  observation: String,
});

const EvaluationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  groupName: {
    type: String,
    required: true,
  },
  classEventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassEvent",
    required: true
  },
  grade: { type: Number, min: 1, max: 10 },
  gradeComment: String,
  behavior: String,
  subjects: [SubjectSchema],
  gaps: [GapSchema],
}, {
  timestamps: true,
});

EvaluationSchema.index({ studentId: 1, groupId: 1, classEventId: 1 }, { unique: true });

export default mongoose.model("Evaluation", EvaluationSchema);
