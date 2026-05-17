import mongoose from "mongoose";

const toolSchema = mongoose.Schema({
  // Tool unique id
  toolid: {
    type: String,
    required: true,
    unique: true,
  },

  // Tool name
  toolname: {
    type: String,
    required: true,
  },

  // Tool description
  description: {
    type: String,
    required: true,
  },

  // Tool condition
  condition: {
    type: String,
    required: true,
  },

  // Tool category
  category: {
    type: String,
    required: true,
  },

  // Tool availability status
  availability: {
    type: String,
    required: true,
  },

  // Tool price
  price: {
    type: Number,
    required: true,
  },

  // Tool likes count
  likes: {
    type: Number,
    default: 0,
  },

   // Users who liked the tool
  likedUsers: {
    type: [String],
    default: [],
  },

  // Tool image
  image: {
    type: String,
    default: "",
  },

  // Date when tool added
  addDate: {
    type: Date,
    required:true,
    default: Date.now,
  },
});

// Creating tools collection model
const ToolModel = mongoose.model("toolInfos", toolSchema);

export default ToolModel;