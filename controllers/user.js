import jwt from 'jsonwebtoken';
import { Admin } from '../models/DashboardUsers.js';
const createToken = async (payload) => {
  try {
    const options = {
      expiresIn: '1h',
    };
    console.log(process.env.SECRETE_KEY)
    const token = jwt.sign(payload, process.env.SECRETE_KEY, options);
    return token;
  } catch (error) {
    throw new Error("Error while creating jwt token: " + error?.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email does not exist" });
    }
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid  password" });
    }
    const token = await createToken({ id: user._id, email: user.email });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const verify = async (req , res ) => {
    try {
      console.log("start")
      console.log(req.body , "this is req body")
       const {token } = req.body ; 
       console.log(token , "this is token") ; 
       const decode = jwt.verify(token , process.env.SECRETE_KEY ) ; 
       return res.status(200).json({message:"Valid Token" , user:decode})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:"Invalid Token" })
    }
}