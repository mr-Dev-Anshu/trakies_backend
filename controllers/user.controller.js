import { User } from "../models/Admin.js";
import UserProfile from "../models/UserProfile.js";
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
    res.status(error?.status || 500).json({
        status:405, 
        message:"Already Registered"
    });

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
export const makeProfile = async (req, res) => {
  const data = req.body;
  console.log(data);
  res.json("working fine");
};

export const createUserProfile = async (req, res) => {
  const {
    email,
    dob,
    age,
    gender,
    contact,
    emergancy_contact,
    identity_proof,
    address,
    profile_img,
  } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const newUserProfile = new UserProfile({
      email,
      dob,
      age,
      gender,
      contact,
      emergancy_contact,
      identity_proof,
      address,
      profile_img,
    });
    const savedProfile = await newUserProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating profile", details: error.message });
  }
};

// Get a user profile by ID
export const getUserProfileBy = async (req, res) => {
  const { id } = req.body;
  try {
    const userProfile = await UserProfile.findById(id);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching profile", details: error.message });
  }
};

// Update a user profile by ID
export const updateUserProfile = async (req, res) => {
  const updates = req.body;
  const { id } = req.body;
  try {
    const updatedProfile = await UserProfile.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating profile", details: error.message });
  }
};
