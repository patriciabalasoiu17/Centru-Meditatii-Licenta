import mongoose from "mongoose";

const { Schema } = mongoose;

const TeacherSchema = new Schema(
  {
    Name: { type: String, required: true },
    Mail: { type: String, required: true },
    Phone: { type: String },
    Subject: { type: [String], required: true },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);
export default Teacher;
