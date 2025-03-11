
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: function(state,action){
            return action.payload
        }
    }
})

export const {addFeed} = feedSlice.actions;
export default feedSlice.reducer;
