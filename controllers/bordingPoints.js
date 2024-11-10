import mongoose from "mongoose";
import BoardingPoint from "../models/BoardingPoints.js";

export const addBoardingPoint = async (req, res) => {
    try {
        const newBoardingPoint = new BoardingPoint(req.body);
        await newBoardingPoint.save();
        res.status(201).json(newBoardingPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBoardingPointsByTransportId = async (req, res) => {
    const transportId  = req.query.transportId;
    try {
        const boardingPoints = await BoardingPoint.find({ transportId });
        res.status(200).json(boardingPoints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBoardingPoint = async (req, res) => {
    const id = req.query.id;
    const { longitude, latitude, boardingPointName, boardingPointTime, boardingPointDate } = req.body;
    try {
        const updatedBoardingPoint = await BoardingPoint.findByIdAndUpdate(
            id,
            { longitude, latitude, boardingPointName, boardingPointTime, boardingPointDate },
            { new: true }
        );
        res.status(200).json(updatedBoardingPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBoardingPoint = async (req, res) => {
    const id  = req.query.id;
    try {
        await BoardingPoint.findByIdAndDelete(id);
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
