import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

interface Iuser extends Document {
  email: string;
  username: string;
  password: string;
  generateToken: any;
  validateUser: any;
  token: string;
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exist"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    // unique: [true, "Email already exist"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: { type: String },
});

userSchema.pre<Iuser>("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateToken = async function generateToken() {
  const user = this;
  const token = jwt.sign({ id: this._id }, "process.env.JWT");
  this.token = token;
  await user.save();
  return token;
};

userSchema.statics.validateUser = async function validateUser(
  email: string,
  password: string
) {
  const user = await User.findOne({ email });
  if (!user) {
    throw "User Does not exist";
  }
  const passwordMatch = await bcrypt.compare(password, user!.password);
  if (!passwordMatch) {
    throw "Wrong Password";
  }
  return user;
};

const User = mongoose.model<Iuser>("User", userSchema);

export default User;
