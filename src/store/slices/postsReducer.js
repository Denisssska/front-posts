import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostApi } from "../../api/postsApi";

const initialState = {
  posts: {
    items: [],
    status: "loading"
  },
  tags: {
    items: [],
    status: "loading"
  }
};
export const getPostsTC = createAsyncThunk("/posts/getPostsTC", async () => {
  const { data } = await PostApi.getPosts();
  return data;
});
export const getTagsTC = createAsyncThunk("/posts/getTagsTC", async () => {
  const { data } = await PostApi.getTags();
  return data;
});
const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: {
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
    }
  }
});

export const postsReducer = postsSlice.reducer;