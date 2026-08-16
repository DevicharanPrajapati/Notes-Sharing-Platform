import express from "express";


import {
  createCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCategoryController,
);

router.get(
  "/",
  getCategoriesController,
);

router.get(
  "/:id",
  getCategoryController,
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateCategoryController,
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategoryController,
);

export default router;