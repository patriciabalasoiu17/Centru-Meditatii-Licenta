// controllers/GroupController.js
import mongoose from "mongoose";
import Group from "../models/GroupModel.js";

export const getGroups = async (req, res) => { 
  const { teacherId, name } = req.query;

  try {
    if (name) {
      const query = { name };
      if (teacherId) query.teacherId = teacherId;

      const group = await Group.findOne(query);
      if (!group) {
        return res.status(404).json({ error: "Grupul nu a fost găsit." });
      }

      return res.status(200).json(group);
    }

    const groups = teacherId
      ? await Group.find({ teacherId }).sort({ createdAt: -1 })
      : await Group.find({}).sort({ createdAt: -1 });

    res.status(200).json(groups);
  } catch (error) {
    console.error("Eroare la obținerea grupurilor:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getGroup = async (req, res) => {
  const { id } = req.params;

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(group);
};

export const createGroup = async (req, res) => {
  const { name, teacherId, students, subject } = req.body;

  try {
    const group = await Group.create({ name, teacherId, students, subject });
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const group = await Group.findOneAndDelete({ _id: id });

  if (!group) {
    return res.status(400).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(group);
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nu au fost gasite rezultate" });
  }

  const group = await Group.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!group) {
    return res.status(400).json({ error: "Nu au fost gasite rezultate" });
  }

  res.status(200).json(group);
};
