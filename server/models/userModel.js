
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      console.log(`The current password without bcrypt: ${this.password}`);
      this.password = await bcrypt.hash(this.password, 10);
      console.log(`The current password with bcrypt: ${this.password}`);
    }
    next();
  } catch (error) {
    console.error('Error during password hashing:', error);
    next(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        userid: this._id.toString(),
        email: this.email,
      },
      process.env.SECRET_KEY
    );

    // Ensure tokens field is properly initialized
    if (!this.tokens) {
      this.tokens = [];
    }
    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
  } catch (error) {
    console.error('Token generation failed:', error);
    throw new Error('Token generation failed');
  }
};

const UserRegister = mongoose.model("UserRegister", userSchema);

module.exports = UserRegister;

