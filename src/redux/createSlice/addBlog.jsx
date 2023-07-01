import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addBlog = createAsyncThunk("blog/addBlog", async ({ title, image, content, tags }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:5000/blogapp/blog/CreateBlog`, { title: title, image: image, content: content, tags: tags }, {
            headers: {
                authorization: `${token}`,
                'Content-Type': 'multipart/form-data'
            },
        })
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blog: null,
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBlog.pending, (state, action) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.error = null;
                state.blog = action.payload;
                state.loading = false;
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
    }

})

export default blogSlice.reducer;