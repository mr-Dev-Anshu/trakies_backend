import mongoose from "mongoose";
import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", data: newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const id = req.query.id;
    const updates = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking updated successfully", data: updatedBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating booking", error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking", error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const tourId = req.query.id;
    // const bookings = await Booking.find({ tourId });
    const bookings = await Booking.aggregate(
      [
        { $match: { tourId: new mongoose.Types.ObjectId(tourId) } },
        {
          $lookup: {
            from: "user_profiles",
            localField: "email",
            foreignField: "email",
            as: "ProfileData"
          }
        }
      ]
    )
    res.status(200).json({ data: bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};
export const getMyTour = async (req, res) => {
  try {
    const email = req.query.email;

    if (!email){
       return res.status(400).json("Please provide email")
    }

    const bookingsWithTourDetails = await Booking.aggregate([
      {
        $match: { email },
      },
      {
        $lookup: {
          from: "tours",
          localField: "tourId",
          foreignField: "_id",
          as: "tourDetails",
        },
      },
      {
        $unwind: "$tourDetails",
      },
      {
        $lookup: {
          from: "images",
          localField: "tourDetails._id",
          foreignField: "id",
          as: "tourDetails.images",
        },
      },
      {
        $lookup: {
          from: "checkinbagages",
          localField: "tourId",
          foreignField: "tourId",
          as: "checkinbagages"
        }
      },
      {
        $lookup: {
          from: "backpacks",
          localField: "tourId",
          foreignField: "tourId",
          as: "backpacks"
        }
      },
      {
        $lookup: {
          from: "includeds",
          localField: "tourId",
          foreignField: "tourId",
          as: "includeds"
        }
      },
      {
        $lookup: {
          from: "notincludeds",
          localField: "tourId",
          foreignField: "tourId",
          as: "notincludeds"
        }
      },
      {
        $lookup: {
          from: "allocatedaccommodations",
          localField: "_id",
          foreignField: "bookingId",
          as: "allocatedAccommodation"
        }
      },
    
      {
        $lookup: {
          from: "allcatedtransports",
          localField: "_id",
          foreignField: "bookingId",
          as: "allocatedTransport"
        }
      },

      {
          $lookup:{
             from:"members", 
             localField:"email",
             foreignField:"userEmail", 
             as:"Members"
          }
      }
    ]);

    res.status(200).json({ data: bookingsWithTourDetails });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings with tour details and images",
      error: error.message,
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const id = req.query.id;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ data: booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: error.message });
  }
};