import express from "express";

import {
  getAllAdminCategoriesController,
  getAdminCategoryByIdController,
  createAdminCategoryController,
  updateAdminCategoryController,
  deleteAdminCategoryController,
} from "../controllers/adminCategoryController.js";

const router = express.Router();

router.get("/", getAllAdminCategoriesController);

router.get("/:id", getAdminCategoryByIdController);

router.post("/", createAdminCategoryController);

router.put("/:id", updateAdminCategoryController);

router.delete("/:id", deleteAdminCategoryController);

export default router;