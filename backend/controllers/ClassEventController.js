// controllers/ClassEventController.js
import mongoose from "mongoose";
import ClassEvent from "../models/ClassEventModel.js";

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
  console.log("🚀 ~ createClassEvent ~ title:", title);
  console.log("🚀 ~ createClassEvent ~ teacherId:", teacherId);
  console.log("🚀 ~ createClassEvent ~ end:", end);
  console.log("🚀 ~ createClassEvent ~ start:", start);

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
  console.log("🚀 ~ updateClassEvent ~ req.body:", req.body);
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
