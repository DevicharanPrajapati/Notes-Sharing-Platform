import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {
  getAllUsers,
  getUserById,
  updateUserBanStatus,
  updateUserRole,
  deleteUser,
} from "../services/adminUserService.js";

export const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await getAllUsers();

  res.status(200).json({
    success: true,
    users,
  });
});

export const getUserByIdController = asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const banUserController = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot ban yourself");
  }

  const user = await updateUserBanStatus(req.params.id, true);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    message: "User banned successfully",
    user,
  });
});

export const unbanUserController = asyncHandler(async (req, res) => {
  const user = await updateUserBanStatus(req.params.id, false);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    message: "User unbanned successfully",
    user,
  });
});

export const updateUserRoleController = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!["user", "staff"].includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  if (req.params.id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot change your own role");
  }

  const user = await updateUserRole(req.params.id, role);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user,
  });
});

export const deleteUserController = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot delete yourself");
  }

  const user = await deleteUser(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});