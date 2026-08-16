import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import noteModerationRoutes from "./noteModerationRoutes.js";
import adminUserRoutes from "./adminUserRoutes.js";
import {
  getDashboardController,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);
router.use("/users", adminUserRoutes);
router.use("/notes", noteModerationRoutes);

router.get("/dashboard", getDashboardController);

export default router;