import User from "../models/User.js";

export const getAllUsers = async () => {
  return await User.find()
    .select("-passwordHash")
    .sort({ createdAt: -1 });
};

export const getUserById = async (userId) => {
  return await User.findById(userId).select("-passwordHash");
};

export const updateUserBanStatus = async (userId, isBanned) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        isBanned,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-passwordHash");
};

export const updateUserRole = async (userId, role) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        role,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-passwordHash");
};

export const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId).select("-passwordHash");
};