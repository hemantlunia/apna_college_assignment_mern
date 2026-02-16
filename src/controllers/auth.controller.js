import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "user with this email already exist" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
    });
    return res.status(201).json({ message: "Registration successfully" });
  } catch (error) {
    console.error(error.message || "Error while creating user");
    return res
      .status(500)
      .json({ message: error.message || "Error while creating user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const matchpass = await bcrypt.compare(password, user.password);
    if (!matchpass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error.message || "Error while logging user");
    return res
      .status(500)
      .json({ message: error.message || "Error while logging user" });
  }
};
