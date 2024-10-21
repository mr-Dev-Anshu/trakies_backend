import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { name, age, gender, email, tourId, accommodation, isTrekker } =
      req.body;
    const newBooking = new Booking({
      name,
      age,
      gender,
      email,
      tourId,
      accommodation,
      isTrekker,
    });

    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", data: newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const id = req.query.id;
    const updates = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking updated successfully", data: updatedBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating booking", error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
     const id = req.query.id ; 
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking", error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
     const tourId =  req.query.id ; 
    const bookings = await Booking.find({tourId});
    res.status(200).json({ data: bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ data: booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: error.message });
  }
};