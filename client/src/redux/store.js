import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./issueSlice";
import projectReducer from "./projectSlice";
import commentReducer from "./commentSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    issue: issueReducer,
    project: projectReducer,
    comments: commentReducer,
    user: userSlice,
  },
});

export default store;
