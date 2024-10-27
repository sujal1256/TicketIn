import { createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
    name:"project",
    initialState:{
        project:{}
    },
    reducers:{
        storeProject(state, action){
                state.project = action.payload; 
        },
        removeProject(state){
            state.project = {};
        }
    }
})

export const {storeProject, removeProject} = projectSlice.actions;

export default projectSlice.reducer;