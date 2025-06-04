import Absence from "../models/AbsenceModel.js";

export const createAbsence = async (req, res) => {
  try {
    const absence = await Absence.create(req.body);
    res.status(201).json(absence);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAbsencesByStudent = async (req, res) => {
  const { studentId } = req.params;
  const absences = await Absence.find({ studentId });
  res.json(absences);
};
