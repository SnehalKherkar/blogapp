import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const Registration = createAsyncThunk("user/Registration", async ({ Email,
    Contact_no,
    First_Name,
    Middle_Name,
    Last_Name,
    Date_of_Birth,
    username,
    password,
    profile_picture }) => {
    try {
        const response = await axios.post(`http://localhost:5000/blogapp/user/userregistration`, {
            Email,
            Contact_no,
            First_Name,
            Middle_Name,
            Last_Name,
            Date_of_Birth,
            username,
            password,
            profile_picture
        }, {
            headers: {
                "Content-Type": "multipart/form-data", 
            }
        })
        toast.success("Registration Successfull!Please Login Now!")
        return response;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    user: null,
    error: null,
}

const resgisterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Registration.pending, (state) => {
                state.error = null;
            })
            .addCase(Registration.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(Registration.rejected, (state, action) => {
                state.error = action.error;
            })
    }
})

export default resgisterSlice.reducer;