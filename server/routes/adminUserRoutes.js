import express from "express";

import {
  getAllUsersController,
  getUserByIdController,
  banUserController,
  unbanUserController,
  updateUserRoleController,
  deleteUserController,
} from "../controllers/adminUserController.js";

const router = express.Router();

router.get("/", getAllUsersController);

router.get("/:id", getUserByIdController);

router.patch("/:id/ban", banUserController);

router.patch("/:id/unban", unbanUserController);

router.patch("/:id/role", updateUserRoleController);

router.delete("/:id", deleteUserController);

export default router;