import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const unLikeBlog = createAsyncThunk("unlike/unlikeblog", async ({ blogId }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`http://localhost:5000/blogapp/blog/unlikeBlog/${blogId}`, {}, {
            headers: {
                authorization: `${token}`
            },
        }
        )
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

const unLikeSlice=createSlice({
    name:"unlike",
    initialState:{
        unlike:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(unLikeBlog.pending,(state, action)=>{
                state.loading=true;
            })
            .addCase(unLikeBlog.fulfilled,(state, action)=>{
                state.loading=false;
                state.unlike=action.payload;
            })
            .addCase(unLikeBlog.rejected, (state, action)=>{
                state.error=action.error;
            })
    }
})

export default unLikeSlice.reducer;