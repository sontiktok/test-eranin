// Khởi tạo cấu hình môi trường và các thư viện cần thiết
const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const sequelize = require("./config/database");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
