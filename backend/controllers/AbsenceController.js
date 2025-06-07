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

export const deleteAbsence = async (req, res) => {
  const { studentId, groupName, classEventId } = req.params;

  try {
    const deleted = await Absence.findOneAndDelete({ studentId, groupName, classEventId });

    if (!deleted) {
      return res.status(404).json({ message: "Absența nu a fost găsită." });
    }

    res.status(200).json({ message: "Absența a fost ștearsă cu succes." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
