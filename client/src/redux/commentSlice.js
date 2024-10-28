import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {
    storeComments(state, action) {
      state.comments = action.payload;
    },
    removeComments(state) {
      state.comments = {};
    },
  },
});

export const { storeComments, removeComments } = commentSlice.actions;

export default commentSlice.reducer;
