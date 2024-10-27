import BackPack from "../models/BackPack.js";
import CheckInBaggage from "../models/CheckInBaggage.js";

export const addBackPackItem = async (req, res) => {
  try {
    const { tourId, item } = req.body;
    const newItem = new BackPack({ tourId, item });
    await newItem.save();
    res
      .status(201)
      .json({ message: "BackPack item added successfully", data: newItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding BackPack item", error: error.message });
  }
};

export const getAllBackPackItems = async (req, res) => {
  try {
    const tourId = req.query.tourId;
    const backPackItems = await BackPack.find({ tourId });
    res.status(200).json(backPackItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching BackPack items", error: error.message });
  }
};

export const updateBackPackItem = async (req, res) => {
  try {
    const id = req.query.id;
    const { tourId, item } = req.body;
    const updatedItem = await BackPack.findByIdAndUpdate(
      id,
      { tourId, item },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "BackPack item not found" });
    }
    res.status(201).json({
      message: "BackPack item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating BackPack item", error: error.message });
  }
};

export const deleteBackPackItem = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedItem = await BackPack.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "BackPack item not found" });
    }
    res.status(200).json({ message: "BackPack item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting BackPack item", error: error.message });
  }
};

export const addCheckInBaggageItem = async (req, res) => {
  try {
    const { tourId, item } = req.body;
    const newItem = new CheckInBaggage({ tourId, item });
    await newItem.save();
    res.status(201).json({
      message: "CheckInBaggage item added successfully",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding CheckInBaggage item",
      error: error.message,
    });
  }
};

export const getAllCheckInBaggageItems = async (req, res) => {
  try {
    const tourId = req.query.tourId;
    const checkInBaggageItems = await CheckInBaggage.find({ tourId });
    res.status(200).json(checkInBaggageItems);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching CheckInBaggage items",
      error: error.message,
    });
  }
};

export const updateCheckInBaggageItem = async (req, res) => {
  try {
    const id = req.query.id;
    const { tourId, item } = req.body;
    const updatedItem = await CheckInBaggage.findByIdAndUpdate(
      id,
      { tourId, item },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "CheckInBaggage item not found" });
    }
    res.status(201).json({
      message: "CheckInBaggage item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating CheckInBaggage item",
      error: error.message,
    });
  }
};

export const deleteCheckInBaggageItem = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedItem = await CheckInBaggage.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "CheckInBaggage item not found" });
    }
    res
      .status(200)
      .json({ message: "CheckInBaggage item deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting CheckInBaggage item",
      error: error.message,
    });
  }
};
