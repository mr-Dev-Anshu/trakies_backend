import Tour from "../models/Tour";

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
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a tour by ID
export const getTourById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("Please Provide id to get the Tour details ");
    }
    const tour = await Tour.findById(req.body.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};
