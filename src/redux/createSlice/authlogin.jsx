import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk("login/fetchuserlogin", async ({ username, password }) => {
    try {
        const response = await axios.post(`http://localhost:5000/blogapp/user/login`, { username, password })
        localStorage.setItem("token", response.data.data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
}

const loginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(userLogin.pending, (state)=>{
                state.error=null;
            })
            .addCase(userLogin.fulfilled, (state, action)=>{
                state.isAuthenticated=true;
                state.user=action.payload;
            })
            .addCase(userLogin.rejected, (state, action)=>{
                state.isAuthenticated=false;
                state.error=action.error;
            })
            
    }
})

export default loginSlice.reducer;