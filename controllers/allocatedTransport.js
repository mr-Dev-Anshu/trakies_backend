import mongoose from "mongoose";
import AllcatedTransport from "../models/AllocatedTransport.js";

export async function createAllcatedTransport(req, res) {
    try {
        const newAccommodation = new AllcatedTransport(req.body);
        await newAccommodation.save() ; 
        res.status(201).json(newAccommodation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating allocated accommodation', error: error.message });
    }
}

export async function getAllcatedTransport(req, res) {
    try {
        const tourId = req.query.tourId;
        const accommodations = await AllcatedTransport.aggregate([
            {
                $match: { tourId: new mongoose.Types.ObjectId(tourId) }
            },
            {
                $lookup: {
                    from: "bookings",
                    localField: "bookingId",
                    foreignField: "_id",
                    as: "bookingData"
                }
            },
        ]);
        // const accommodations = await AllcatedTransport.find({})
        res.status(200).json(accommodations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accommodations', error: error.message });
    }
}


export const getByBusNumber = async (req , res )=> {
      try {

        const busNumber = req.query.busNumber ; 
        
        const data = await AllcatedTransport.aggregate([
            {
                $match: { busNumber:busNumber }
            },
            {
                $lookup: {
                    from: "bookings",
                    localField: "bookingId",
                    foreignField: "_id",
                    as: "bookingData"
                }
            },
            { $unwind: "$bookingData" }
        ])

        return res.status(200).json(data)
        
      } catch (error) {
        res.status(500).json({ message: 'Error fetching Team Mates ', error: error.message });

      }
}

export const deleteAllcatedTransport = async (req , res )=> {
    const id  = req.query.id;
    try {
        await AllcatedTransport.findByIdAndDelete(id);
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}