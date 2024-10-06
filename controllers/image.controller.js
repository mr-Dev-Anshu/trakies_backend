import { Image } from "../models/Image.js";
export const createImage = async (req, res) => {
  try {
    const { id, url , type  } = req.body;
    if (!id || !url) {
      return res.status(400).json({ message: "Please provide Id and Url" });
    }
    const newImage = new Image({ id, url , type });
    await newImage.save();
    return res.status(201).json({ message: "Image Created Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const id = req.headers.id; 
    console.log("this is from getImage " ,  id);
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