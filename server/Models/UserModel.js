import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  // User full name
  name: {
    type: String,
    required: true,
  },

  // User email
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // User phone number
  phone: {
    type: String,
    required: true,
  },

  // User gender
  gender: {
    type: String,
    required: true,
  },

  // User age category selected from dropdown
  ageCategory: {
    type: String,
    required: true,
  },

  // User password
  password: {
    type: String,
    required: true,
  },

  // Optional profile picture
  profilePic: {
    type: String,
  },
});

// Creating the MongoDB collection model
const UserModel = mongoose.model("userInfos", UserSchema);

export default UserModel;