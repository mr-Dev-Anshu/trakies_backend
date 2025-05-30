import { Image } from "../models/Image.js";
import mongoose from "mongoose";
export const createImage = async (req, res) => {
  try {
    const { id, url, type, typeId } = req.body;
    if (!id || !url) {
      return res.status(400).json({ message: "Please provide Id and Url" });
    }
    const newImage = new Image({ id, url, type, typeId });
    await newImage.save();
    return res.status(201).json({ message: "Image Created Successfully"  , newImage});
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const id = req.headers.id;
    console.log("this is from getImage ", id);
    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide Id for getting the urls " });
    }
    const images = await Image.find({ id });
    if (!images || images?.length === 0) {
      return res.status(400).json({ message: "Images not found " });
    }
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json(error?.message);
  }
};

export const deleteImage = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide Id for deleting the image" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const deletedImage = await Image.findByIdAndDelete(id);
    return res.status(200).json({ message: "Image deleted successfully", deletedImage });
  } catch (error) {
    return res.status(500).json({ message: error?.message || "Server error" });
  }
};
