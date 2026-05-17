import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  // User email
  email: {
    type: String,
    required: true,
  },

  // Comment message
  commentMsg: {
    type: String,
    required: true,
  },

  // Related tool id
  toolid: {
    type: String,
  },

  // Comment date
  commentDate: {
    type: Date,
    default: Date.now,
  },
});

// Creating comments collection model
const CommentModel = mongoose.model("comments", commentSchema);

export default CommentModel;