import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CommentApi } from "../../api/commentsApi";

const initialState = {
  comments: {
    items: [],
    status: "loading"
  }
};
export const createCommentTC = createAsyncThunk("/comments/createCommentTC", async (payload) => {
  const { data } = await CommentApi.createComment(payload);
  return data;
});
export const getAllCommentsTC = createAsyncThunk("/comments/getAllCommentsTC", async () => {
  const { data } = await CommentApi.getAllComments();
  return data;
});
export const getAllCommentsInPostTC = createAsyncThunk("/comments/getAllCommentsInPostTC", async () => {
  const { data } = await CommentApi.getAllCommentsInPost();
  return data;
});
export const updateCommentTC = createAsyncThunk("/comments/updateCommentTC", async ({ commentId, payload }) => {
  const { data } = await CommentApi.updateComment(commentId, payload);
  console.log(data);
  // return data;
});
export const deleteCommentTC = createAsyncThunk("/comments/deleteCommentTC", async (commentId) => {
  const { data } = await CommentApi.deleteComment(commentId);
  return data;
});


const commentSlice = createSlice({
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

export const commentsReducer = commentSlice.reducer;