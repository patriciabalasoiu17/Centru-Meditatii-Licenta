import express from "express";
import {
  createAbsence,
  getAbsencesByStudent,
  deleteAbsence,
  getMaxAttendanceForDay
} from "../controllers/AbsenceController.js";

const router = express.Router();

router.post("/", createAbsence);
router.get("/student/:studentId", getAbsencesByStudent);
router.get("/max-attendance", getMaxAttendanceForDay)
router.delete("/:studentId/:groupName/:classEventId", deleteAbsence);

export default router;
