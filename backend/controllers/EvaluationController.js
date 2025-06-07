import Evaluation from "../models/EvaluationModel.js";
import Group from "../models/GroupModel.js"

export const createOrUpdateEvaluation = async (req, res) => {
  const { studentId, groupName, classEventId } = req.body;

  try {
    const updated = await Evaluation.findOneAndUpdate(
      { studentId, groupName, classEventId },
      req.body,
      { upsert: true, new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvaluation = async (req, res) => {
  const { studentId, groupName, classEventId } = req.params;

  try {
    const evaluation = await Evaluation.findOne({ studentId, groupName, classEventId });
    if (!evaluation) return res.status(404).json({ message: "Nu există evaluare." });
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentEvaluation = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();

    const groupCache = new Map();
    const grouped = {};

    for (const evals of evaluations) {
      const groupName = evals.groupName;

      let groupData = groupCache.get(groupName);
      if (!groupData) {
        groupData = await Group.findOne({ name: groupName });
        if (!groupData) continue;
        groupCache.set(groupName, groupData);
      }

      const subject = groupData.subject;

      if (!grouped[subject]) {
        grouped[subject] = [];
      }

      grouped[subject].push(evals);
    }

    res.status(200).json(grouped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentEvaluationsWithGrade = async (req, res) => {
  const { studentId } = req.params;

  try {
    const evaluations = await Evaluation.find({
      studentId,
      grade: { $ne: null }
    });

    if (evaluations.length === 0) {
      return res.status(404).json({ message: "Studentul nu are evaluări cu notă." });
    }

    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvaluationsGroupedBySubject = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ grade: { $ne: null } });

    const groupCache = new Map();
    const grouped = {};

    for (const evals of evaluations) {
      const groupName = evals.groupName;

      let groupData = groupCache.get(groupName);
      if (!groupData) {
        groupData = await Group.findOne({ name: groupName });
        if (!groupData) continue;
        groupCache.set(groupName, groupData);
      }

      const subject = groupData.subject;

      if (!grouped[subject]) {
        grouped[subject] = [];
      }

      grouped[subject].push(evals);
    }

    res.status(200).json(grouped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

