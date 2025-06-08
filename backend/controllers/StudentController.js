import mongoose from "mongoose";
import Student from "../models/StudentModel.js";

export const getStudents = async (req, res) => {
  const students = await Student.find({}).sort({ createdAt: -1 });
  res.status(200).json(students);
};

export const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(student);
};


export const getStudentByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email invalid" });
  }

  try {
    const student = await Student.findOne({ Mail: email });

    if (!student) {
      return res.status(404).json({ error: "Nu au fost gasite rezultate" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Eroare la căutarea elevului după email:", error);
    res.status(500).json({ error: "Eroare internă a serverului" });
  }
};

export const createStudent = async (req, res) => {
  const { Name, Mail, Phone, Year } = req.body;

  try {
    const student = await Student.create({ Name, Mail, Phone, Year });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(400).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(student);
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!student) {
    return res.status(400).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(student);
};
