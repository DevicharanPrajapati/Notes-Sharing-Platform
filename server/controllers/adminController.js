import asyncHandler from "../utils/asyncHandler.js";
import { getDashboardStats } from "../services/adminService.js";

export const getDashboardController = asyncHandler(async (req, res) => {
  const dashboard = await getDashboardStats();
  res.status(200).json({
    success: true,
    ...dashboard,
  });
});
