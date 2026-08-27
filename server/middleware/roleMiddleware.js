import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const roleMiddleware = (...allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to access this resource");
    }

    next();
  });

export default roleMiddleware;