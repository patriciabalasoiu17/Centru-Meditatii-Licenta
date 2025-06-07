import express from "express";
import { createOrUpdateEvaluation, getEvaluation, getStudentEvaluation, getEvaluationsGroupedBySubject } from "../controllers/EvaluationController.js";

const router = express.Router();

router.post("/", createOrUpdateEvaluation);
router.get("/grades/:studentId", getEvaluationsGroupedBySubject);
router.get("/:studentId/:groupName/:classEventId", getEvaluation);
router.get("/:studentId", getStudentEvaluation);

export default router;
