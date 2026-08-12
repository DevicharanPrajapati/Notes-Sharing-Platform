import express from "express";

import { register, login, getMe, logout } from "../controllers/authController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import {
  registerValidator,
  loginValidator,
} from "../utils/validators/authValidator.js";
import authRateLimiter from "../middleware/rateLimitMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  authRateLimiter,
  registerValidator,
  validationMiddleware,
  register,
);

router.post(
  "/login",
  authRateLimiter,
  loginValidator,
  validationMiddleware,
  login,
);

router.get("/me", authMiddleware, getMe);
router.post("/logout", authMiddleware, logout);

export default router;
