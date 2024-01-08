const jwt = require("jsonwebtoken");
const JWT_SECRET = "thsisiastrungnittoveshaserd";

const fetchUserDets = async (req, res, next) => {
  const token = req.header("auth-token");

  try {
    if (!token) {
      throw new Error("Token not provided");
    }

    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).send({ error: "Token not validated" });
  }
};

module.exports = fetchUserDets;
