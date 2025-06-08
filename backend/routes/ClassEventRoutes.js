// routes/ClassEventRoutes.js
import { Router } from "express";
import {
  createClassEvent,
  updateClassEvent,
  deleteClassEvent,
  getClassEvent,
  getClassEventsForTeacher,
} from "../controllers/ClassEventController.js";

const router = Router();

router.get("/", getClassEventsForTeacher);
router.get("/:id", getClassEvent);
router.post("/", createClassEvent);
router.delete("/:id", deleteClassEvent);
router.patch("/:id", updateClassEvent);

export default router;
