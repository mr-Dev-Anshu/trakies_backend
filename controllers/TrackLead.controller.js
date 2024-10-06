import Tour from "../models/Tour.js";
import TourLead from "../models/TourLead.js";

export const createTourLead = async (req, res) => {
  try {
    const { email, track_id } = req.body;
    const newLead = await TourLead.create({ email, track_id });
    res.status(200).json(newLead);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error?.message || "Something went worng in creating Track lead");
  }
};

export const getAllTour = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json("Please Provide Track Lead's Email ");
    }
    const allTours = await Tour.aggregate([
      {
        $lookup: {
          from: "tourleads",
          localField: "_id",
          foreignField: "track_id",
          as: "leads",
        },
      },

      {
        $unwind: "$leads",
      },

      {
         $match:{"leads.email":email} 
      } , 

      {
        $project: {
          name: 1,
          coverImg: 1,
          location: 1,
          _id: 1,
          description: 1,
        },
      },
    ]);
    return res.status(200).json(allTours);
  } catch (error) {
    res
      .json(error?.status || 500)
      .json(error?.message || "Problem to find the Tours");
  }
};

