import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("users/fetchAll", async () => {
    try {
        const response = await axios.get("http://localhost:5000/blogapp/user/getAllusers");
        return response.data.data; 
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    users: null,
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.error = action.error; 
            });
    },
});

export default usersSlice.reducer;
