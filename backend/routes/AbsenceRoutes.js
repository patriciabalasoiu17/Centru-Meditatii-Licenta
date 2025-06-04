import express from "express";
import {
  createAbsence,
  getAbsencesByStudent,
} from "../controllers/AbsenceController.js";

const router = express.Router();

router.post("/", createAbsence);
router.get("/student/:studentId", getAbsencesByStudent);

export default router;
