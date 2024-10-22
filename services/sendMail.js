const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (email, otp) => {
  const mailOptions = {
    from: {
      name: "Eranin Group",
      address: process.env.EMAIL_USERNAME,
    },
    to: email,
    subject: "Xác thực đăng nhập",
    html: `Bạn đang thực hiện yêu cầu đăng nhập, vui lòng lòng nhập mã xác thức để tiếp tục đăng nhập.
    Mã xác thực của bạn là: ${otp}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = { sendMail };
