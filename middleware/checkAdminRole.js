// middleware/auth.js

import { User } from "../models/Admin.js";
import { ApiError } from "../utils/ApiError.js";

export const checkAdminRole = async (req, res, next) => {
  try {
    const email = req.headers["x-user-email"];
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    if (user.role !== "admin" &&  user.role !== "coordinator" ) {
      throw new ApiError(403, "Access denied: Admins only");
    }
    next();
  } catch (error) {
    res.status(error?.status || 500).json({ message: error.message });
  }
};
