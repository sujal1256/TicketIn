import { createSlice } from '@reduxjs/toolkit'

const issueSlice = createSlice({
    name:"issue",
    initialState:{
        issue:{}
    },
    reducers:{
        storeIssue(state, action){
                state.issue = action.payload; 
        },
        removeIssue(state){
            state.issue = {};
        }
    }
})

export const {storeIssue, removeIssue} = issueSlice.actions;

export default issueSlice.reducer;