const express = require("express");
const otpController = require("../controllers/OtpController");

const router = express.Router();

router.post("/send-otp", otpController.sendOtp);

module.exports = router;
