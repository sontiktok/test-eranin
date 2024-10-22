const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const Token = require("../models/Token");
const { generateToken } = require("../utils/jwtUtil");
const { sendMail } = require("../services/sendMail");
const { where } = require("sequelize");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const EXPIRE_IN_ACCESS_TOKEN = process.env.EXPIRE_IN_ACCESS_TOKEN;
const EXPIRE_IN_REFRESH_TOKEN = process.env.EXPIRE_IN_REFRESH_TOKEN;

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is existed!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    newUser.password = undefined;
    res.status(201).json({
      success: true,
      message: "Register successfully!",
      data: { user: newUser },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password is incorrect" });
    }

    // Verify OTP
    const otpModel = await Otp.findOne({
      where: {
        email,
        value: otp,
      },
    });
    if (!otpModel) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const currentTime = new Date();
    const isOtpExpired = currentTime > otpModel.expiresAt;
    const isOtpRevoked = otpModel.isRevoked;
    if (isOtpExpired || isOtpRevoked) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    // Revoke otp
    otpModel.isRevoked = true;
    await otpModel.save();

    // Create Token in DB - Manage Token
    const token = await Token.create({
      userId: user.id,
      isRevoked: false,
    });

    // Generate jwt token
    const payload = {
      id: user.id,
      email: user.email,
      tokenId: token.id,
    };
    const accessToken = generateToken(
      payload,
      JWT_SECRET,
      EXPIRE_IN_ACCESS_TOKEN
    );
    const refreshToken = generateToken(
      payload,
      REFRESH_SECRET,
      EXPIRE_IN_REFRESH_TOKEN
    );

    res
      .status(200)
      .json({ success: true, data: { accessToken, refreshToken } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please try again,",
      error: error.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Missing refreshToken field" });
  }
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const { tokenId } = decoded;
    const tokenModel = await Token.findOne({
      where: {
        id: tokenId,
      },
    });
    const isValidToken = tokenModel && !tokenModel.isRevoked;
    if (!isValidToken) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid JWT Token" });
    }

    // Revoke token
    tokenModel.isRevoked = true;
    await tokenModel.save();

    const userModel = await User.findOne({ where: { id: tokenModel.userId } });
    // Create new Token in DB - Manage Token
    const newTokenModel = await Token.create({
      userId: userModel.id,
      isRevoked: false,
    });

    // Generate jwt token
    const payload = {
      id: userModel.id,
      email: userModel.email,
      tokenId: newTokenModel.id,
    };
    const newAccessToken = generateToken(
      payload,
      JWT_SECRET,
      EXPIRE_IN_ACCESS_TOKEN
    );
    const newRefreshToken = generateToken(
      payload,
      REFRESH_SECRET,
      EXPIRE_IN_REFRESH_TOKEN
    );

    res.json({
      success: true,
      data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    });
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid RefreshToken" });
  }
};

exports.logout = async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Missing accessToken field" });
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    const { tokenId } = decoded;
    const tokenModel = await Token.findOne({
      where: {
        id: tokenId,
      },
    });
    const isValidToken = tokenModel && !tokenModel.isRevoked;
    if (!isValidToken) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid JWT Token" });
    }

    // Revoke token
    tokenModel.isRevoked = true;
    await tokenModel.save();

    res.json({ success: true, message: "Logout Successfully", data: null });
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid accessToken" });
  }
};

exports.getProducts = (req, res) => {
  return res.status(200).json({ success: true, data: "Da ta ok" });
};
