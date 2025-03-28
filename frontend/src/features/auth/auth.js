import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { constantsConfig } from "../../constants";

export const userRegister = createAsyncThunk(
    "auth/userRegister",
    async (data) => {
        // write your api here
        console.log("registering api");
        try {
            const response = await axios({
                url: `${constantsConfig.BASE_URL}/api/auth/user-register`,
                method: "post",
                data,
            });
            console.log("from auth thunk");
            return response?.data;
        } catch (error) {
            console.log("error", error);
        }
    }
);

export const userLogin = createAsyncThunk("auth/userLogin", async (data) => {
    // write your api here
    console.log("registering api");
    try {
        const response = await axios({
            url: `${constantsConfig.BASE_URL}/api/auth/user-login`,
            method: "post",
            data,
        });
        console.log("from auth thunk");
        return response?.data;
    } catch (error) {
        console.log("error", error);
    }
});

const initialState = {
    accessToken: localStorage?.getItem("userAccess")
        ? localStorage?.getItem("userAccess")
        : null,
    userInfo: localStorage?.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
};

export const userAuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    // todo: set the pending and loading state with the later for the shimmer
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.fulfilled, (state, action) => {
                console.log("action from fulfilled", state, action);
                state.userInfo = action?.payload;
                state.accessToken = action?.payload?.accessToken;

                // store accesstoke into the localstorage
                if (action?.payload?.accessToken && action?.payload) {
                    localStorage.setItem(
                        "userAccess",
                        action?.payload?.accessToken
                    );
                    localStorage.setItem(
                        "userInfo",
                        JSON.stringify(action?.payload)
                    );
                }
            })
            .addCase(userRegister.rejected, (state, action) => {
                console.log(action);
                console.log("api failed due to some reasone");
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.userInfo = action?.payload?.data;
                state.accessToken = action.payload?.accessToken;

                if (action?.payload?.accessToken && action?.payload) {
                    localStorage.setItem(
                        "userAccess",
                        action?.payload?.accessToken
                    );
                    localStorage.setItem(
                        "userInfo",
                        JSON.stringify(action?.payload?.data)
                    );
                }
            });
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
    userAuthSlice.actions;

export default userAuthSlice.reducer;
