import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./issueSlice";
import projectReducer from "./projectSlice";
import commentReducer from "./commentSlice";

const store = configureStore({
  reducer: {
    issue: issueReducer,
    project: projectReducer,
    comments: commentReducer,
  },
});

export default store;
