import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./createSlice/getUsers";
import loginReducer from "./createSlice/authlogin";
import resgisterReducer from "./createSlice/userRegistration";
import blogsReducer from "./createSlice/getAllblogs";
import likeReducer from "./createSlice/likeBlog";
import unLikeReducer from "./createSlice/unLikeBlog";
import commentReducer from "./createSlice/addComment";
import singleBlogReducer from "./createSlice/getSingleBlog";
import blogSlice from "./createSlice/addBlog";

const store = configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
    user: resgisterReducer,
    blogs: blogsReducer,
    like: likeReducer,
    unlike: unLikeReducer,
    comment: commentReducer,
    singleBlog: singleBlogReducer,
    blog: blogSlice,
  },
});

export default store;
