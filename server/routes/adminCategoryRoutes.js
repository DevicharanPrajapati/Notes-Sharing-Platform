import express from "express";

import {
  getAllAdminCategoriesController,
  getAdminCategoryByIdController,
  createAdminCategoryController,
  updateAdminCategoryController,
  deleteAdminCategoryController,
} from "../controllers/adminCategoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "staff"),
  getAllAdminCategoriesController,
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "staff"),
  getAdminCategoryByIdController,
);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createAdminCategoryController,
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateAdminCategoryController,
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteAdminCategoryController,
);
export default router;
