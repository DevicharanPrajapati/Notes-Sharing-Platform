import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import noteModerationRoutes from "./noteModerationRoutes.js";
import adminUserRoutes from "./adminUserRoutes.js";
import { getDashboardController } from "../controllers/adminController.js";

import adminCategoryRoutes from "./adminCategoryRoutes.js";

const router = express.Router();

// router.use(authMiddleware, adminMiddleware);
router.use("/users", authMiddleware, adminMiddleware, adminUserRoutes);

router.use("/notes", noteModerationRoutes);
router.use("/categories", adminCategoryRoutes);

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboardController,
);
export default router;
