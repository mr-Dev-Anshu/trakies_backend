import mongoose from "mongoose";
import Expanse from "../models/Expanse.js";
import Tour from "../models/Tour.js";

export const addExpance = async (req, res) => {
  try {
    const newExpanse = await Expanse.create(req.body);
    return res.status(200).json(newExpanse);
  } catch (error) {
    return res.status(error?.status || 500).json(error?.message);
  }
};
export const getExpanses = async (req, res) => {
  try {
    const tour_id = req.query.id;
    if (!tour_id) {
      return res.status(400).json("Please provide tour id ");
    }
    const expanses = await Expanse.find({ tour_id });
    const budget = await Tour.findById(tour_id).select("budget");
    const spent = await Expanse.aggregate([
      { $match: { tour_id: new mongoose.Types.ObjectId(tour_id) } }, // Ensure tour_id is ObjectId
      {
        $group: {
          _id: null,
          spent: { $sum: { $toDouble: "$amount" } }, // Sum the 'amount' field
        },
      },
      {
        $project: {
          spent: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({ expanses, spent, budget});
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json(error?.message || "Something went wrong with getExpanse ");
  }
};
export const updateExpanse = async (req, res) => {
  try {
    const update = req.body;
    const { id } = req.body;
    if (!id) {
      return res.status(400).json("Please provoid  id ");
    }
    const updatedExpanse = await Expanse.findByIdAndUpdate(id, update, {
      new: true,
    });
    console.log(updatedExpanse);
    return res.status(200).json(updatedExpanse);
  } catch (error) {
    return res.status(500).json(error?.message);
  }
};