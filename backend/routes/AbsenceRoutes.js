import express from "express";
import {
  createAbsence,
  getAbsencesByStudent,
  deleteAbsence
} from "../controllers/AbsenceController.js";

const router = express.Router();

router.post("/", createAbsence);
router.get("/student/:studentId", getAbsencesByStudent);
router.delete("/:studentId/:groupName/:classEventId", deleteAbsence);

export default router;
