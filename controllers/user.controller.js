import { User } from "../models/Admin.js";
import { ApiError } from "../utils/ApiError.js";

export const signup = async (req, res) => {
  try {
    const body = req.body;
    if (body?.email === null || body?.role === null) {
      throw new ApiError(400, "All Fields are  reqired for Signup");
    }
    
    const { email, role } = body;

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      throw new ApiError(405, "Already Registered");
    }
    const user = await User.create({ email, role });

    res.status(200).json({
      status: 200,
      message: "User have been add with the role",
    });
  } catch (error) {
    res.status(error?.status || 500).json(error?.message);
  }
};

export const signin = async (req, res) => {
  try {
    const body = req.body;
    if (body?.email === null || body?.password === null) {
      throw new ApiError(400, "All Fields are  reqired for Signup");
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User not found ");
    }
    res.status(200).json(user?.role);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error.message || "Something went worong");
  }
};
export const logout = () => {
  console.log("Logout is processing");
};
