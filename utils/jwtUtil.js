const jwt = require("jsonwebtoken");
function generateToken(payload, secret, expiresInTime) {
  const options = { expiresIn: expiresInTime };

  return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token) {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
module.exports = { generateToken, verifyAccessToken };
