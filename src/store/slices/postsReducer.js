import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostApi } from "../../api/postsApi";
import { getAllCommentsTC } from "./commentsReducer";

const initialState = {
  posts: {
    items: [],
    status: "loading"
  },
  tags: {
    items: [],
    status: "loading"
  },
  comments:{
    items:[],
    status:"loading"
  }
};
export const getPostsTC = createAsyncThunk("/posts/getPostsTC", async () => {
  const { data } = await PostApi.getPosts();
  return data;
});
export const deletePostTC = createAsyncThunk("/posts/deletePostTC", async (postId) => {
  const { data } = await PostApi.deletePost(postId);
  return data;
});
// export const updatePostTC = createAsyncThunk("/posts/updatePostTC", async ({ postId, payload }) => {
//   const { data } = await PostApi.updatePost(postId, payload);
//   console.log(data);
//   // return data;
// });
export const getTagsTC = createAsyncThunk("/posts/getTagsTC", async () => {
  const { data } = await PostApi.getTags();
  return data;
});
const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllCommentsTC.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [getAllCommentsTC.fulfilled]: (state, action) => {
      state.comments.items=action.payload
      state.comments.status = "loaded";
    },
    [getAllCommentsTC.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    [getPostsTC.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [getPostsTC.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [getPostsTC.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [getTagsTC.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [getTagsTC.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [getTagsTC.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    [deletePostTC.pending]: (state, action) => {
      console.log(action.meta.arg);
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    },
    [deletePostTC.fulfilled]: (state, action) => {
      state.posts.status = action.payload.message;
    },
    [deletePostTC.rejected]: (state) => {
      state.posts.status = "error";
    }
  }
});

export const postsReducer = postsSlice.reducer;