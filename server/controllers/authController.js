
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const UserRegister = require("../models/userModel")

/*..........................
............................
RESIGSTRATION LOGIC
......................................
........................*/
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const userExist = await UserRegister.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const userCreated = await UserRegister.create({
      name,
      email,
      password
    });

    res.status(201).json({
      message: "Register successful",
      token: await userCreated.generateToken(),
      userid: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Internal error during registration:", error);
    res.status(500).json("Internal error");
  }
};
/*..........................
............................
LOGIN LOGIC
......................................
........................*/
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await UserRegister.findOne({ email });
    console.log("User found during login:", userExist);

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid User" });
    }

    const userpassword = await bcrypt.compare(password, userExist.password);
    console.log("Password comparison result:", userpassword);

    if (userpassword) {
      const token = await userExist.generateToken();
      res.status(200).json({
        message: "Login successful",
        token: token,
        userid: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid email and password" });
    }
  } catch (error) {
    console.error("Internal error during login:", error);
    res.status(500).json("Internal error");
  }
};
/*..........................
............................
USER DATA SEND LOGIC IN FRONTEND
......................................
........................*/
  const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ msg: userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };


 
  

module.exports = { register,login,user };
