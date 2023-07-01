import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllBlogs = createAsyncThunk("blogs/fetchAll", async () => {
    try {
        const response = await axios.get("http://localhost:5000/blogapp/blog/getallblogs");
        return response.data.data; 
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    blogs: null,
    error: null,
};

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.error = null;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.blogs = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.error = action.error; 
            });
    },
});

export default blogsSlice.reducer;
