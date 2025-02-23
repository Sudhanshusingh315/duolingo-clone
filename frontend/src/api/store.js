import { configureStore } from "@reduxjs/toolkit";
import courseMaterialReducer from "../features/courseMaterial";
export const store = configureStore({
    reducer: {
        course: courseMaterialReducer,
    },
});
