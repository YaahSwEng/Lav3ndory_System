import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// Save user comment to database
export const saveComment = createAsyncThunk(
  "comments/saveComment",
  async (commentData) => {
    try {
      const response = await axios.post("http://localhost:3001/saveComment", {
        commentMsg: commentData.commentMsg,
        email: commentData.email,
      });

      return response.data.comment;
    } catch (error) {
      console.log(error);
      throw new Error("Saving comment failed");
    }
  }
);


// Get all comments from database
export const getComments = createAsyncThunk("comments/getComments", async () => {
  try {
    const response = await axios.get("http://localhost:3001/getComments");
    return response.data.comments;
  } catch (error) {
    console.log(error);
    throw new Error("Fetching comments failed");
  }
});



export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveComment.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(saveComment.fulfilled, (state, action) => {
      state.comments.unshift(action.payload);
      state.isLoading = false;
      state.isSuccess = true;
    });

    builder.addCase(saveComment.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
  },
});

export default commentSlice.reducer;

