import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const likeBlog = createAsyncThunk("like/likeBlog", async ({ blogId }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`http://localhost:5000/blogapp/blog/likeBlog/${blogId}`,
            {},
            {
                headers: {
                    authorization: `${token}`
                },
            })
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
})


const likeSlice=createSlice({
    name:"like",
    initialState:{
        like:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(likeBlog.pending,(state, action)=>{
                state.loading=true;
            })
            .addCase(likeBlog.fulfilled,(state, action)=>{
                state.loading=false;
                state.like=action.payload;
            })
            .addCase(likeBlog.rejected, (state, action)=>{
                state.error=action.error;
            })
    }
})

export default likeSlice.reducer;