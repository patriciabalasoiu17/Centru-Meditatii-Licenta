import express from "express";
import {
  getUsers,
  getUserById,
  getUsersWithoutRole,
  updateUserRole,
  removeUserRole,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/without-role", getUsersWithoutRole);
router.get("/:id", getUserById);
router.put("/:id/role", updateUserRole);
router.delete("/:id/role", removeUserRole);

export default router;
