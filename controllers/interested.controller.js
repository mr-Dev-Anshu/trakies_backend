// controllers/interestedController.js

import mongoose from "mongoose";
import Interested from "../models/Interested.js";

export async function createInterested(req, res) {
    try {
        const { tourId, email } = req.body;
        const newInterest = await Interested.create({ tourId, email });
        res.status(201).json(newInterest);
    } catch (error) {
        console.error('Error creating interest:', error);
        res.status(500).json({ message: 'Error creating interest', error: error.message });
    }
}

export async function deleteInterested(req, res) {
    try {
        const id = req.query.id;
        const deletedInterest = await Interested.findByIdAndDelete(id);
        if (!deletedInterest) {
            return res.status(404).json({ message: 'Interest not found' });
        }
        res.status(200).json({ message: 'Interest deleted successfully' });
    } catch (error) {
        console.error('Error deleting interest:', error);
        res.status(500).json({ message: 'Error deleting interest', error: error.message });
    }
}

export async function updateInterested(req, res) {
    try {
        const id = req.query.id;
        const { enrolled } = req.body;
        const updatedInterest = await Interested.findByIdAndUpdate(id, { enrolled }, { new: true });
        if (!updatedInterest) {
            return res.status(404).json({ message: 'Interest not found' });
        }
        res.status(200).json(updatedInterest);
    } catch (error) {
        console.error('Error updating interest:', error);
        res.status(500).json({ message: 'Error updating interest', error: error.message });
    }
}

export async function getInterestedByTourId(req, res) {
    try {
        const tourId = req.query.tourId;
        // const interests = await Interested.find({ tourId });
        const interestedData = await Interested.aggregate([
            {
                $match: { tourId: new  mongoose.Types.ObjectId(tourId) }
            },
            {
                $lookup: {
                    from: 'user_profiles',
                    localField: 'email',
                    foreignField: 'email',
                    as: 'profileData'
                }
            },
            {
                $unwind: '$profileData'
            }
        ])
        res.status(200).json(interestedData);
    } catch (error) {
        console.error('Error fetching interests:', error);
        res.status(500).json({ message: 'Error fetching interests', error: error.message });
    }
}
