import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk("comment/addComment", async ({ blogId, content}) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`http://localhost:5000/blogapp/blog/commentsAdd/${blogId}`, {content:content},
            {
                headers: {
                    authorization: `${token}`
                },
            }
        )
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

const commentSlice=createSlice({
    name:"comment",
    initialState:{
        comment:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(addComment.pending,(state, action)=>{
                state.loading=true;
            })
            .addCase(addComment.fulfilled,(state, action)=>{
                state.loading=false;
                state.comment=action.payload;
            })
            .addCase(addComment.rejected, (state, action)=>{
                state.error=action.error;
            })
    }
})

export default commentSlice.reducer;