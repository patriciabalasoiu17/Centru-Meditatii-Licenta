import mongoose from 'mongoose';

const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    Name: { type: String, required: true },
    Mail: { type: String, required: true },
    Phone: { type: String },
    Year: { type: String, required: true },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', StudentSchema);
export default Student;
