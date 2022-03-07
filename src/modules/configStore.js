import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boards";

export const store = configureStore({
	reducer: {
        boards: boardReducer,
    },
});
