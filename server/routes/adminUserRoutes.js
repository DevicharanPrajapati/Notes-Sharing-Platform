import express from "express";

import {
  getAllUsersController,
  getUserByIdController,
  banUserController,
  unbanUserController,
  updateUserRoleController,
  deleteUserController,
} from "../controllers/adminUserController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllUsersController,
);

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getUserByIdController,
);

router.patch(
  "/:id/ban",
  authMiddleware,
  adminMiddleware,
  banUserController,
);

router.patch(
  "/:id/unban",
  authMiddleware,
  adminMiddleware,
  unbanUserController,
);

router.patch(
  "/:id/role",
  authMiddleware,
  adminMiddleware,
  updateUserRoleController,
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserController,
);
export default router;