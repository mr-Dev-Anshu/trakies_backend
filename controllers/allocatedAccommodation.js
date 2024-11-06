import mongoose from "mongoose";
import AllocatedAccommodation from "../models/AllocatedAccommodation.js";

export async function createAllocatedAccommodation(req, res) {
    try {
        const { bookingId, accommodationId, roomNumber, roomType, occupancy, tourId } = req.body;
        const newAccommodation = await AllocatedAccommodation.create({ bookingId, accommodationId, roomNumber, roomType, occupancy, tourId });
        res.status(201).json(newAccommodation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating allocated accommodation', error: error.message });
    }
}

export async function getAllocatedAccommodationsByTourId(req, res) {
    try {
        const tourId = req.query.tourId;

        const accommodations = await AllocatedAccommodation.aggregate([
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
            { $unwind: "$bookingData" }
        ]);

        // const accommodations = await AllocatedAccommodation.find({})

        res.status(200).json(accommodations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accommodations', error: error.message });
    }
}

export async function updateAllocatedAccommodation(req, res) {
    try {
        const id = req.query.id;
        const { bookingId, accommodationId, roomNumber, roomType, occupancy } = req.body;
        const updatedAccommodation = await AllocatedAccommodation.findByIdAndUpdate(
            id,
            { bookingId, accommodationId, roomNumber, roomType, occupancy },
            { new: true }
        );
        if (!updatedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.status(200).json(updatedAccommodation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating accommodation', error: error.message });
    }
}

export async function deleteAllocatedAccommodation(req, res) {
    try {
        const id = req.query.id;
        const deletedAccommodation = await AllocatedAccommodation.findByIdAndDelete(id);
        if (!deletedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.status(200).json({ message: 'Accommodation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting accommodation', error: error.message });
    }
}




export async function getAllocatedAccommodationsByAccommodationId(req, res) {
    try {
        const accommodationId  = req.query.accoId;

        const accommodations = await AllocatedAccommodation.aggregate([
            {
                $match: { accommodationId: new mongoose.Types.ObjectId(accommodationId) }
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
        ]);

        // const accommodations = await AllocatedAccommodation.find({})

        res.status(200).json(accommodations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accommodations', error: error.message });
    }
}