import { configureStore } from "@reduxjs/toolkit";
import courseMaterialReducer from "../features/course/courseMaterial";
export const store = configureStore({
    reducer: {
        course: courseMaterialReducer,
    },
});
