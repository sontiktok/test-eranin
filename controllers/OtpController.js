const { randomOtp } = require("../utils/randomOtp");
const { sendMail } = require("../services/sendMail");
const Otp = require("../models/Otp");

const DURATION_MILLISECONDS = 5 * 60 * 1000; // 5 min
/**
 * send otp
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Revoke all old OTP
    await Otp.update(
      {
        isRevoked: true,
      },
      {
        where: {
          email,
        },
      }
    );

    const otp = randomOtp(4);

    // create new otp
    await Otp.create({
      email,
      value: otp,
      isRevoked: false,
      expiresAt: new Date(Date.now() + DURATION_MILLISECONDS),
    });

    sendMail(email, otp);

    res
      .status(201)
      .json({ success: true, message: "successfully", data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: "try again", error });
  }
};
