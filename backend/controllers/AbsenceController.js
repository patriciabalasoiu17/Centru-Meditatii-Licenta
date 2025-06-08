import Absence from "../models/AbsenceModel.js";
import ClassEvent from "../models/ClassEventModel.js";
import Group from "../models/GroupModel.js";

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

export const getMaxAttendanceForDay = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "Ziua nu a fost specificată." });
    }

    const day = new Date(date);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const events = await ClassEvent.find({
      start: { $lt: nextDay },
      end: { $gte: day },
    });

    const groupNames = new Set(events.map(e => e.title));
    const groupDocs = await Group.find({ name: { $in: Array.from(groupNames) } });

    const studentIdsSet = new Set();
    for (const group of groupDocs) {
      for (const studentId of group.students) {
        studentIdsSet.add(studentId);
      }
    }

    const absences = await Absence.find({
      date: {
        $gte: day,
        $lt: nextDay,
      },
    });

    const prezente = studentIdsSet.size;
    const absente = absences.length;

    res.status(200).json({
      prezente,
      absente,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};