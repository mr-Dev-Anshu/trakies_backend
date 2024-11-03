import mongoose from "mongoose";
import CheckPoint from "../models/checkPoints.js";
import CheckedPoint from "../models/checkedPoints.js";

export const addCheckedPoint = async (req, res) => {
  try {
    const newCheckedPoint = new CheckedPoint(req.body);
    newCheckedPoint.save();
    return res.status(200).json(newCheckedPoint);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


export const getCheckedPoints = async (req, res) => {
  try {
    const email = req.query.email;
    const tourId = req.query.tourId;
    if (!email) {
      return res.status(400).json("Please provide the email");
    }
    console.log(email)
    const checkedPoints = await CheckedPoint.find({ email })
    console.log(checkedPoints)
    const checkedPointsId = checkedPoints.map((ch) =>
      ch.checkPointId.toString()
    );
    console.log(checkedPointsId);
    const checkPoint = await CheckPoint.find({ tourId });
    const result = checkPoint.map((check) => {
      return {
        ...check._doc,
        checked: checkedPointsId.includes(check._id.toString()),
      };
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


export const getAllCheckedUserByCheckPointId = async (req, res) => {
  try {
    const checkPointId = req.query.checkPointId;
    if (checkPointId) {
      res.status(400).json("Please Provide the checkpoint ID ");
    }
    const data = await CheckedPoint.aggregate([
      {
        $match: { checkPointId: new mongoose.Types.ObjectId(checkPointId) }
      },
      {
        $lookup: {
          from: 'user_profiles',
          localField: 'email',
          foreignField: 'email',
          as: 'profileData'
        }
      }
    ])
    res.status(200).json(data);
  } catch (error) {
     res.status(500).json(error.message)
  }
}