import mongoose from "mongoose";
import Tour from "../models/Tour.js";
import { paginate } from "../utils/pagination.js";

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

// Get all tours with pagination
export const getAllTours = async (req, res) => {
  try {
     let  {status } = req.query ; 

     if (!status || !status ==="Active" || !status === "Inactive") {
           return res.status(400).json({message:"Invalid status"})
     }
     if (status==="Inactive"){
        status = false 
     } else if (status==="Active") {
       status = true 
     } 
    console.log(status)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pipeline = [
      {
        $match: {
          booking_close: { $gt: today },
        },
      },
      {
        $match: {
          status,
        },
      },

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
          as: "checkinbagages",
        },
      },
      {
        $lookup: {
          from: "backpacks",
          localField: "_id",
          foreignField: "tourId",
          as: "backpacks",
        },
      },
      {
        $lookup: {
          from: "includeds",
          localField: "_id",
          foreignField: "tourId",
          as: "includeds",
        },
      },
      {
        $lookup: {
          from: "notincludeds",
          localField: "_id",
          foreignField: "tourId",
          as: "notincludeds",
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "tourId",
          as: "allBookings",
        },
      },

      // Step 3: Add bookedCount
      {
        $addFields: {
          bookedCount: { $size: "$allBookings" },
        },
      },

      // Step 4: Remove allBookings from output
      {
        $project: {
          allBookings: 0,
        },
      },

      // Step 5: Sort by createdAt descending (newest first)
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

   delete req.query.status ; 

    // Use the pagination utility
    const { results: tours, pagination } = await paginate(Tour, {
      pipeline,
      query: req.query,
      defaultLimit: 10,
    });

    res.status(200).json({
      tours,
      pagination,
    });
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
      {
        $lookup: {
          from: "checkinbagages",
          localField: "_id",
          foreignField: "tourId",
          as: "checkinbagages",
        },
      },
      {
        $lookup: {
          from: "backpacks",
          localField: "_id",
          foreignField: "tourId",
          as: "backpacks",
        },
      },
      {
        $lookup: {
          from: "includeds",
          localField: "_id",
          foreignField: "tourId",
          as: "includeds",
        },
      },
      {
        $lookup: {
          from: "notincludeds",
          localField: "_id",
          foreignField: "tourId",
          as: "notincludeds",
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
