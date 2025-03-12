
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: function(state,action){
            return action.payload
        },
        removeRequests: function(state,action){
            let newRequests = state.filter((request)=> request._id !== action.payload)
            return newRequests;
        }
    }
})

export const {addRequests,removeRequests} = requestSlice.actions
export default requestSlice.reducer
