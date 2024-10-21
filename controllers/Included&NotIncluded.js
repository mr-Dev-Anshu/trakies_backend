import Included from "../models/Included.js";
import NotIncluded from "../models/NotIncluded.js";

export const addNotIncludedItem = async (req, res) => {
  try {
    const { tourId, item } = req.body;
    const newItem = new NotIncluded({ tourId, item });
    await newItem.save();
    res
      .status(201)
      .json({ message: "Not Included item added successfully", data: newItem });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error adding Not Included item",
        error: error.message,
      });
  }
};
export const getAllNotIncludedItems = async (req, res) => {
    try {
        const tourId = req.query.tourId ; 
      const notIncludedItems = await NotIncluded.find({tourId});
      res.status(200).json({ data: notIncludedItems });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Not Included items', error: error.message });
    }
  };

export const updateNotIncludedItem = async (req, res) => {
  try {
    const id = req.query.id;
    const { tourId, item } = req.body;
    const updatedItem = await NotIncluded.findByIdAndUpdate(
      id,
      { tourId, item },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Not Included item not found" });
    }
    res
      .status(200)
      .json({
        message: "Not Included item updated successfully",
        data: updatedItem,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating Not Included item",
        error: error.message,
      });
  }
};

export const deleteNotIncludedItem = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedItem = await NotIncluded.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Not Included item not found" });
    }
    res.status(200).json({ message: "Not Included item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting Not Included item",
        error: error.message,
      });
  }
};

export const addIncludedItem = async (req, res) => {
  try {
    const { tourId, item } = req.body;
    const newItem = new Included({ tourId, item });
    await newItem.save();
    res
      .status(201)
      .json({ message: "Included item added successfully", data: newItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding Included item", error: error.message });
  }
};

export const deleteIncludedItem = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedItem = await Included.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Included item not found" });
    }
    res.status(200).json({ message: "Included item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Included item", error: error.message });
  }
};

export const updateIncludedItem = async (req, res) => {
  try {
    const id = req.query.id;
    const { tourId, item } = req.body;
    const updatedItem = await Included.findByIdAndUpdate(
      id,
      { tourId, item },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Included item not found" });
    }
    res
      .status(200)
      .json({
        message: "Included item updated successfully",
        data: updatedItem,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Included item", error: error.message });
  }
};


export const getAllIncludedItems = async (req, res) => {
    try {
        const tourId = req.query.tourId ; 
      const includedItems = await Included.find({tourId});
      const notIncluded = await NotIncluded.find({tourId}) ; 
      res.status(200).json({ data: {includedItems , notIncluded} });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Included items', error: error.message });
    }
  };