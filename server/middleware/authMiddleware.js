
const jwt = require("jsonwebtoken");
const UserRegister = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  console.log("Token middleware", token);

  const jwtToken = token.replace("Bearer ", "");

  try {
    const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);

    const userData = await UserRegister.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    next();
  } catch (error) {
    console.error("Unauthorized. Invalid token.", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
