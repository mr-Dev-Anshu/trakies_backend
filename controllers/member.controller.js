import Member from "../models/Member.js";

export const addMember = async (req, res) => {
  try {
    const { userEmail, name, relation, age, gender, contact } = req.body;

    if (!userEmail || !name || !relation || !age || !gender || !contact) {
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
   const  userEmail = req.headers.userEmail ; 
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
