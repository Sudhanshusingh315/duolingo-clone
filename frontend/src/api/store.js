import { configureStore } from "@reduxjs/toolkit";
import courseMaterialReducer from "../features/course/courseMaterial";
import userAuthReducer from "../features/auth/auth";
export const store = configureStore({
    reducer: {
        course: courseMaterialReducer,
        auth: userAuthReducer,
    },
});
