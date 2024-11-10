import mongoose from "mongoose";
import Transport from "../models/Transport.js"

export const createTransport = async (req, res) => {
    try {
        const newTransport = new Transport(req.body)
        await newTransport.save();
        res.status(201).json(newTransport);
    } catch (error) {
        res.status(500).json(error?.message || "Something went wrong while creating transport")
    }
}

export const getTransport = async (req, res) => {

    try {
        const tourId = req.query.tourId;
        const transport = await Transport.aggregate([
            {
                $match: { tourId: new mongoose.Types.ObjectId(tourId) },
            },
            {
                $lookup: {
                    from: "allocatedtransports",
                    localField: "_id",
                    foreignField: "transportId",
                    as: "allocated",
                },
            },
            {
                $addFields: {
                    allocatedCount: { $size: "$allocated" },
                },
            },
            {
                $project: {
                    tourId: 1,
                    busName: 1,
                    busNumber: 1,
                    capacity: 1,
                    driverName: 1,
                    driverNumber: 1,
                    allocatedCount: 1
                },
            },
        ]);


        if (!transport) {
            return res.status(404).json({ message: 'transport not found' });
        }
        res.status(200).json(transport);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transport', error: error.message });
    }
}


export async function updateTransport(req, res) {
    try {
        const id = req.query.id;

        const updatedTransport = await Transport.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedTransport) {
            return res.status(404).json({ message: 'Transport not found' });
        }
        res.status(200).json(updatedTransport);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Transport', error: error.message });
    }
}

// Delete an Transport by ID
export async function deleteTransport(req, res) {
    try {
        const id = req.query.id;
        const deletedTransport = await Transport.findByIdAndDelete(id);
        if (!deletedTransport) {
            return res.status(404).json({ message: 'Transport not found' });
        }
        res.status(200).json({ message: 'Transport deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Transport', error: error.message });
    }
}


