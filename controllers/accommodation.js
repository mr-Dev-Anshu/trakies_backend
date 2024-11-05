import Accommodation from '../models/Accommodation.js';
import mongoose from 'mongoose';

// Create a new accommodation
export async function createAccommodation(req, res) {
    try {
        
        const newAccommodation = await Accommodation.create(req.body);
        res.status(201).json(newAccommodation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating accommodation', error: error.message });
    }
}

// Get all accommodations
export async function getAllAccommodations(req, res) {
    try {
        const tourId = req.query.tourId;
        const accommodations = await Accommodation.find({ tourId });
        res.status(200).json(accommodations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accommodations', error: error.message });
    }
}

// Get accommodation by ID
export async function getAccommodationById(req, res) {
    try {
        const tourId = req.query.tourId;
        const accommodation = await Accommodation.find({tourId});
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.status(200).json(accommodation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accommodation', error: error.message });
    }
}

// Update an accommodation by ID
export async function updateAccommodation(req, res) {
    try {
        const id = req.query.id;
       
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(
            id,
           req.body , 
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

// Delete an accommodation by ID
export async function deleteAccommodation(req, res) {
    try {
        const id = req.query.id;
        const deletedAccommodation = await Accommodation.findByIdAndDelete(id);
        if (!deletedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.status(200).json({ message: 'Accommodation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting accommodation', error: error.message });
    }
}
