import bcrypt from "bcryptjs";

import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async ({ name, email, password }) => {
  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  // 2. Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  // 4. Don't return password hash
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
  };
};


const loginUser = async ({ email, password }) => {
  // 1. Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // 2. Check if user is banned
  if (user.isBanned) {
    throw new ApiError(403, "Your account has been banned");
  }

  // 3. Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // 4. Generate JWT
  const token = generateToken(user);

  // 5. Return safe user data
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    },
  };
};

export { registerUser, loginUser };