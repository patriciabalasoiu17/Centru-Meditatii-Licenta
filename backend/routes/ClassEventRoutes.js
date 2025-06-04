// routes/ClassEventRoutes.js
import { Router } from "express";
import {
  createClassEvent,
  updateClassEvent,
  deleteClassEvent,
  getClassEvent,
  getClassEvents,
} from "../controllers/ClassEventController.js";

const router = Router();

router.get("/", getClassEvents);
router.get("/:id", getClassEvent);
router.post("/", createClassEvent);
router.delete("/:id", deleteClassEvent);
router.patch("/:id", updateClassEvent);

export default router;
