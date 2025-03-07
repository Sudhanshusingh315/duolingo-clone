import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLang = createAsyncThunk(
    "admin/fetchLang",
    async (data) => {
        // write the api here
        console.log("api call");
        // const response = await getCourses(data);
        // return response.data;
    }
);

const initialState = {
    courses: [],
    isLoading: false,
    isError: false,
};

export const courseMaterialSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    // todo: set the pending and loading state with the later for the shimmer
    extraReducers: (builder) => {
        builder.addCase(fetchCourseByLang.fulfilled, (state, action) => {
            state.courses = action?.payload?.data;
        });
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
    courseMaterialSlice.actions;

export default courseMaterialSlice.reducer;