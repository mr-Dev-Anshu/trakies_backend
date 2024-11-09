import mongoose from "mongoose";
import CheckedPoint from "../models/checkedPoints.js";
import CheckPoint from "../models/checkPoints.js";

export const createCheckPoint = async (req, res) => {
  try {
    const {
      tourId,
      name,
      description,
      type,
      activated = false,
      longitude,
      latitude,
    } = req.body;
    const checkPoint = new CheckPoint({
      name,
      tourId,
      description,
      type,
      activated,
      longitude,
      latitude,
    });
    await checkPoint.save();
    res
      .status(201)
      .json({ message: "CheckPoint created successfully", data: checkPoint });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating CheckPoint", error: error.message });
  }
};

export const updateCheckPoint = async (req, res) => {
  try {
    const id = req.query.id;
    const updates = req.body;
    const checkPoint = await CheckPoint.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!checkPoint) {
      return res.status(404).json({ message: "CheckPoint not found" });
    }
    res
      .status(200)
      .json({ message: "CheckPoint updated successfully", data: checkPoint });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating CheckPoint", error: error.message });
  }
};

export const deleteCheckPoint = async (req, res) => {
  try {
    const id = req.query.id;
    const checkPoint = await CheckPoint.findByIdAndDelete(id);

    if (!checkPoint) {
      return res.status(404).json({ message: "CheckPoint not found" });
    }

    res.status(200).json({ message: "CheckPoint deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting CheckPoint", error: error.message });
  }
};

export const getAllCheckPoints = async (req, res) => {
  try {
    const tourId = req.query.tourId;
    // const checkPoints = await CheckPoint.find({ tourId });
    // const totalCheckedCount = CheckedPoint.countDocuments({tourId}).

    const checkPoints = await CheckPoint.aggregate([
      {
        $match: { tourId: new mongoose.Types.ObjectId(tourId) },
      },
      {
        $lookup: {
          from: "checkedpoints",
          localField: "_id", // Ensure `tourId` exists directly in CheckPoint schema
          foreignField: "checkPointId", // Ensure `tourId` exists in checkedpoints as well
          as: "allChecked"
        }
      },
      {
        $addFields: {
          allCheckedCount: { $size: "$allChecked" },
        },
      },

      {
        $project:{
            allChecked:0
        }
      }
    ]);
    res.status(200).json(checkPoints);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching checkpoints", error: error.message });
  }
};