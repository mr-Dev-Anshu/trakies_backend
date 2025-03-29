import mongoose from "mongoose";
import Tour from "../models/Tour.js";
import Included from "../models/Included.js";
import NotIncluded from "../models/NotIncluded.js";
import Transport from "../models/Transport.js";
import Accomodation from "../models/Accommodation.js";
import CheckPoint from "../models/checkPoints.js";
import Note from "../models/Note.js";

export const cloneTour = async (req, res) => {
    const session = await mongoose.startSession(); 
    session.startTransaction(); 

    try {

        const tourId = req.query.tourId;
        if(!tourId){
             throw new Error("TourId is required ")
        }
        const tourDetails = await Tour.findById(tourId).select('-createdAt -_id -updatedAt').session(session);
        const included = await Included.find({ tourId }).select('-createdAt -updatedAt -__v -_id -tourId').session(session);
        const notIncluded = await NotIncluded.find({ tourId }).select('-createdAt -updatedAt -__v -_id -tourId').session(session);
        const Transports = await Transport.find({ tourId }).select('-createdAt -_id -updatedAt -tourId').session(session);
        const Accomodations = await Accomodation.find({ tourId }).select('-createdAt -_id -updatedAt -tourId').session(session);
        const checkPoints = await CheckPoint.find({ tourId }).select('-createdAt -_id -updatedAt -tourId').session(session);
        const notes = await Note.find({ tourId }).select('-createdAt -_id -updatedAt -tourId').session(session);

        const newTour = new Tour({ ...tourDetails.toObject() });
        await newTour.save({ session });

        if (!newTour._id) {
            throw new Error("Tour creation failed");
        }

        const newTourId = newTour._id;

        if (notIncluded.length > 0) {
            await NotIncluded.insertMany(notIncluded.map(item => ({ ...item.toObject(), tourId: newTourId })), { session });
        }
        if (included.length > 0) {
            await Included.insertMany(included.map(item => ({ ...item.toObject(), tourId: newTourId })), { session });
        }
        if (Accomodations.length > 0) {
            await Accomodation.insertMany(Accomodations.map(item => ({ ...item.toObject(), tourId: newTourId })), { session });
        }
        if (Transports.length > 0) {
            await Transport.insertMany(Transports.map(item => ({ ...item.toObject(), tourId: newTourId })), { session });
        }
        if (notes.length > 0) {
            await Note.insertMany(notes.map(item => ({ ...item.toObject(), tourId: newTourId })), { session });
        }
        if (checkPoints.length > 0) {
            await CheckPoint.insertMany(checkPoints.map(item => ({ ...item.toObject(), tourId: newTourId })), { session });
        }
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message:"Tour cloned successfully" , newTour, included, Transports, Accomodations, checkPoints, notes, notIncluded });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transaction Failed:", error);
        res.status(500).json({ message: "Cloning failed, all changes reverted!", error: error.message });
    }
};
