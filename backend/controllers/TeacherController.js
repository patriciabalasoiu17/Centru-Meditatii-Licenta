// controllers/TeacherController.js
import mongoose from "mongoose";
import Teacher from "../models/TeacherModel.js";

export const getTeachers = async (req, res) => {
  const teachers = await Teacher.find({}).sort({ createdAt: -1 });
  res.status(200).json(teachers);
};

export const getTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const teacher = await Teacher.findById(id);

  if (!teacher) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(teacher);
};

export const getTeacherByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email invalid" });
  }

  try {
    const teacher = await Teacher.findOne({ Mail: email });

    if (!teacher) {
      return res.status(404).json({ error: "Nu au fost gasite rezultate" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error("Eroare la căutarea profesorului după email:", error);
    res.status(500).json({ error: "Eroare internă a serverului" });
  }
};

export const createTeacher = async (req, res) => {
  const { Name, Mail, Phone, Subject } = req.body;

  try {
    const teacher = await Teacher.create({ Name, Mail, Phone, Subject });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const teacher = await Teacher.findOneAndDelete({ _id: id });

  if (!teacher) {
    return res.status(400).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(teacher);
};

export const updateTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const teacher = await Teacher.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!teacher) {
    return res.status(400).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(teacher);
};
