const express = require("express");
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authentication");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshToken);
router.get("/products", authenticateToken, authController.getProducts);

module.exports = router;
