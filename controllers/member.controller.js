import Member from "../models/Member.js";

export const addMember = async (req, res) => {
  try {
    const { userEmail, name, relation, age, gender, contact , email  } = req.body;

    if (!userEmail || !name || !relation || !age || !gender || !contact , !email ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const allowedGenders = ["Male", "Female", "Other"];
    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({ message: "Invalid gender." });
    }
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
      return res
        .status(400)
        .json({ message: "Invalid contact number format." });
    }

    const newMember = new Member({
      userEmail,
      name,
      relation,
      age,
      gender,
      contact,
      email 
    });

    await newMember.save();
    return res
      .status(201)
      .json({ message: "Member added successfully.", member: newMember });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getMembers = async (req, res) => {
  try {
    const userEmail = req.query.email;
    console.log("Query------", userEmail);
    if (!userEmail) {
      return res
        .status(400)
        .json({ message: "Please Provide userEmail , its required " });
    }
    const members = await Member.find({ userEmail });
    if (!members) {
      return res.status(404).json({ message: "Member not found " });
    }
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

export const deleteMembers = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json("Please provide the id ");
    }
    const deleted = await Member.deleteOne({ _id: id });
    if (!deleted) {
      return res.status(500).json("Error while deleting the member ");
    }
    return res.status(200).json({
      message: "Member is deleted successfully ",
      deleted,
    });
  } catch (error) {
    return res
      .status(500)
      .json(error.message || "Error while deleting the member");
  }
};