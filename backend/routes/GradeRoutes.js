import express from "express";
import { createGrade, getGradesByStudent } from "../controllers/GradeController.js";

const router = express.Router();

router.post("/", createGrade);
router.get("/student/:studentId", getGradesByStudent);

export default router;
