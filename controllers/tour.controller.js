import mongoose from "mongoose";
import Tour from "../models/Tour.js";


// Create a new tour
export const createTour = async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tours
export const getAllTours = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10000;
    const tours = await Tour.aggregate([
      {
        $lookup: {
          from: "images",
          localField: "_id",
          foreignField: "id",
          as: "images",
        },
      },
      { $limit: limit },
    ]);
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTourById = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      throw new Error("Please provide an id to get the tour details");
    }
    const tour = await Tour.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "images",
          localField: "_id",
          foreignField: "id",
          as: "images",
        },
      },
    ]);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const update = req.body;
    const { id } = req.body;
    if (!id) {
      return res.status(400).json("Please provoid  id ");
    }
    const updatedExpanse = await Tour.findByIdAndUpdate(id, update, {
      new: true,
    });
    console.log(updatedExpanse);
    return res.status(200).json(updatedExpanse);
  } catch (error) {
    return res.status(500).json(error?.message);
  }
};
