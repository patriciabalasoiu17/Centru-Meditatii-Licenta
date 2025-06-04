import Grade from "../models/GradeModel.js";

export const createGrade = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getGradesByStudent = async (req, res) => {
  const { studentId } = req.params;
  const grades = await Grade.find({ studentId });
  res.json(grades);
};
