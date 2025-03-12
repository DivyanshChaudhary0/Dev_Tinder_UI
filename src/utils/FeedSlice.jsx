
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: function(state,action){
            return action.payload
        },
        removeUserFromFeed: function(state,action){
            let newFeed = state.filter((feed)=> feed._id !== action.payload)
            return newFeed;
        }
    }
})

export const {addFeed,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;
