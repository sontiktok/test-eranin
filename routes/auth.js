const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authentication");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.get("/products", authenticateToken, authController.getProducts);
module.exports = router;
