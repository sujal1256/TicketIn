import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./issueSlice";
import projectReducer from "./projectSlice";

const store = configureStore({
  reducer: {
    issue: issueReducer,
    project: projectReducer,
  },
});

export default store;
