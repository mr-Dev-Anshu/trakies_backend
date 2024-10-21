import Accommodation from "../models/Accommodation";
export const createAccommodation = async (req, res) => {
  try {
    const newAccommodation = new Accommodation(req.body);
    newAccommodation.save();
    return res.status(200).json({
      message: "Accommodation Created Successfully ",
      data: newAccommodation,
    });
  } catch (error) {
    return res.status(500).json(error?.message);
  }
};

export const getAccommodations = async () => {
  try {
  } catch (error) {}
};

export const getAccommodationById = async () => {};
