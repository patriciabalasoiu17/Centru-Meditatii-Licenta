// routes/GroupRoutes.js
import { Router } from "express";
import {
  createGroup,
  updateGroup,
  deleteGroup,
  getGroups,
  getGroup,
} from "../controllers/GroupController.js";

const router = Router();

router.get("/", getGroups);
router.get("/:name", getGroup);
router.get("/:id", getGroup);
router.post("/", createGroup);
router.delete("/:id", deleteGroup);
router.patch("/:id", updateGroup);

export default router;
