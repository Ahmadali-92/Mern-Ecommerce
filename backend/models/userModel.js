const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //this is build in mdule

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 40 charactor"],
    minLength: [4, "Name should have more than 4 charactor"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Name should be greater than 8 charactor"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  // User Role (e.g., 'user', 'admin')
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashing the password before saving to the database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // this.password = await bcrypt.hash(this.password, 10);//also this one method

    next();
  } catch (error) {
    next(error);
  }
});

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Custom method to compare passwords
userSchema.methods.comparePassword = async function (enterPassword) {
  try {
    return await bcrypt.compare(enterPassword, this.password);
  } catch (error) {
    throw error;
  }
};

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex"); //randomBytes(20) se koi se 20 number gener kr dy ga to string se se garbej valu eajay gi but ("hex") se likhny se wo proper number ban jay gy wrna buffer value ajay gi .e.g:(43565756756846786796789)

  //Hashing and adding resetPasswordToken to user
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); //"sha256" this is algorithm

  //expire this password
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
