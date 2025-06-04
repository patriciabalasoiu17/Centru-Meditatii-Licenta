import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeachers,
  updateTeacher,
  getTeacherByEmail,
} from "../controllers/TeacherController.js";

const router = express.Router();

router.get("/", getTeachers);
router.get("/email/:email", getTeacherByEmail);
router.get("/:id", getTeacher);
router.post("/", createTeacher);
router.delete("/:id", deleteTeacher);
router.patch("/:id", updateTeacher);

export default router;
