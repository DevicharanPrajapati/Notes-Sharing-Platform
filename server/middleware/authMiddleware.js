import jwt from "jsonwebtoken";

import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId).select("-passwordHash");

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  if (user.isBanned) {
    throw new ApiError(403, "Your account has been banned");
  }

  req.user = user;

  next();
});

export default authMiddleware;