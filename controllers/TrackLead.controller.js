import Tour from "../models/Tour.js";
import TourLead from "../models/TourLead.js";

export const createTourLead = async (req, res) => {
  try {
    const newLead = new TourLead(req.body);
    await newLead.save();
    res.status(201).json(newLead);
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
        $match: { "leads.email": email },
      },

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



export const getTrekLeads = async (req , res ) => {
  try {
    const tourId = req.query.tourId;
    if(!tourId){
       return res.status(400).json("Please provide tour id ") ; 
    }
    const allTrekLeads = await TourLead.find({ track_id:tourId });
    console.log(allTrekLeads) ;
    res.status(200).json(allTrekLeads);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
