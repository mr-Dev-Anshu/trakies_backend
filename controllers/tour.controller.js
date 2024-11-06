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
      {
        $lookup: {
          from: "checkinbagages",
          localField: "_id",
          foreignField: "tourId",
          as: "checkinbagages"
        }
      },
      {
        $lookup: {
          from: "backpacks",
          localField: "_id",
          foreignField: "tourId",
          as: "backpacks"
        }
      },
      {
        $lookup: {
          from: "includeds",
          localField: "_id",
          foreignField: "tourId",
          as: "includeds"
        }
      },
      {
        $lookup: {
          from: "notincludeds",
          localField: "_id",
          foreignField: "tourId",
          as: "notincludeds"
        }
      },

      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "tourId",
          as: "allBookings"
        }
      },

     

      {
        $addFields: {
          bookedCount: { $size: "$allBookings" }
        }
      },

      {
        $project: {
          allBookings: 0, // Exclude the allBookings array
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
    console.log(id);
    const updatedExpanse = await Tour.findByIdAndUpdate(id, update, {
      new: true,
    });
    console.log(updatedExpanse);
    return res.status(200).json(updatedExpanse);
  } catch (error) {
    return res.status(500).json(error?.message);
  }
};

export const deleteTour = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide an ID to delete the tour" });
    }

    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({ message: "Tour deleted successfully", deletedTour });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};