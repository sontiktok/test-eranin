const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateToken } = require("../utils/jwtUtil");
const { sendMail } = require("../services/sendMail");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    await sendMail(email, "hihihi");
    res
      .status(201)
      .json({ success: true, message: "Đăng ký thành công", user: newUser });
  } catch (error) {
    console.log("Lỗi đăng ký", error);
    res.status(500).json({ success: false, message: "Lỗi đăng ký", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email hoặc mật khẩu không đúng" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Email hoặc mật khẩu không đúng" });
    }

    const accessToken = generateToken(user, JWT_SECRET, "1d");
    const refreshToken = generateToken(user, REFRESH_SECRET, "7d");

    res
      .status(200)
      .json({ success: true, data: { accessToken, refreshToken } });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi đăng nhập", error: error });
  }
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Vui lòng cung cấp refresh token" });
  }

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const { email } = decoded;
    const user = await User.findOne({ where: { email } });
    const accessToken = generateToken(user, JWT_SECRET, "1d");
    res.json({ success: true, accessToken });
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: "Refresh token không hợp lệ" });
  }
};

exports.getProducts = (req, res) => {
  return res.status(200).json({ success: true, data: "Da ta ok" });
};
