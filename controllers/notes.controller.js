import Notes from "../models/Note.js";

export const createNotes = async (req, res) => {
  try {
    const newNotes = new Notes(req.body);
    newNotes.save();
    res.status(201).json(newNotes);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(error.message || "Something went wrong while creating the Notes");
  }
};

export const deleteNotes = async (req , res ) => {
  try {
    const id = req.query.id;
    const deleteNotes = await Notes.findByIdAndDelete(id);
    res.status(200).json("Delete successfully");
  } catch (error) {
    res.status(500).json(error?.message);
  }
};

export const updateNotes = async (req, res) => {
  try {
    const id = req.query.id;
    const body = req.body;
    const updatedNotes = await Notes.findByIdAndUpdate(id, body, { new: true });
    res.status(201).json(updatedNotes);
  } catch (error) {
    res.status(500).json(error?.message);
  }
};

export const getNotes = async (req, res) => {
  try {
    const tourId = req.query.tourId;
    const allNotes = await Notes.find({ tourId });
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json(error?.message);
  }
};
