
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import requestReducer from "./RequestSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        request: requestReducer
    }
})

export default store;