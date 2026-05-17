import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "../Features/UserSlice";
import toolReducer from "../Features/ToolSlice";
import commentReducer from "../Features/CommentSlice";



export const store = configureStore({
  reducer: {
    users: usersReducer,
    tools: toolReducer,
    comments: commentReducer,                                         

  },
});
