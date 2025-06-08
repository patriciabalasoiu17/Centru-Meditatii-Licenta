// controllers/ClassEventController.js
import mongoose from "mongoose";
import ClassEvent from "../models/ClassEventModel.js";
import Group from "../models/GroupModel.js";

export const getClassEventsForTeacher = async (req, res) => {
  const { teacherId } = req.query;

  if (teacherId != null) {
    const teachers = await ClassEvent.find({ teacherId }).sort({ createdAt: -1 });
    res.status(200).json(teachers);
  } else {
    const teachers = await ClassEvent.find().sort({ createdAt: -1 });
    res.status(200).json(teachers);
  }

};
export const getClassEventsForStudent = async (req, res) => {
  const { studentId } = req.query;

  if (!studentId) {
    return res.status(400).json({ error: "studentId este necesar" });
  }

  try {
    const groups = await Group.find({ students: studentId });
    const groupNames = groups.map((g) => g.name);

    const events = await ClassEvent.find({ title: { $in: groupNames } }).sort({ start: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error("Eroare la obținerea evenimentelor:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getClassEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const classEvent = await ClassEvent.findById(id);

  if (!classEvent) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(classEvent);
};

export const createClassEvent = async (req, res) => {
  const { title, start, end, teacherId } = req.body;

  try {
    const classEvent = await ClassEvent.create({
      title,
      start,
      end,
      teacherId,
    });
    res.status(200).json(classEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteClassEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const classEvent = await ClassEvent.findOneAndDelete({ _id: id });

  if (!classEvent) {
    return res.status(400).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(classEvent);
};

export const updateClassEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const classEvent = await ClassEvent.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!classEvent) {
    return res.status(400).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(classEvent);
};
