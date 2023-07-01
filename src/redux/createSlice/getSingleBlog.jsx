import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const singleBlog1=createAsyncThunk("singleBlog/fetchSingleBlog", async({blogId})=>{
    try {
        const response= await axios.get(`http://localhost:5000/blogapp/blog/getSingleBlogbyblogId/${blogId}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

const singleBlogSlice=createSlice({
    name:"singleBlog",
    initialState:{
        singleBlog:null,
        error:null,
        loading:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(singleBlog1.pending,(state)=>{
            state.error=null;
            state.loading=true;
        })
        .addCase(singleBlog1.fulfilled, (state, action)=>{
            state.error=null;
            state.singleBlog=action.payload;
            state.loading=false;
        })
        .addCase(singleBlog1.rejected, (state, action)=>{
            state.error=action.payload;
        })
    }
})

export default singleBlogSlice.reducer;