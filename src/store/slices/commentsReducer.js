import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CommentApi } from "../../api/commentsApi";

const initialState = {
  comments: {
    items: [],
    allComments: [],
    status: "loading"
  }
};
export const createCommentTC = createAsyncThunk("/comments/createCommentTC", async ({
                                                                                      comment,
                                                                                      postId,
                                                                                      avatarUrl,
                                                                                      fullName
                                                                                    }) => {
  const { data } = await CommentApi.createComment({ comment, postId });
  return {
    ...data, user: { avatarUrl, fullName }
  };
});
export const getAllCommentsTC = createAsyncThunk("/comments/getAllCommentsTC", async () => {
  const { data } = await CommentApi.getAllComments();
  return data;
});
export const getAllCommentsInPostTC = createAsyncThunk("/comments/getAllCommentsInPostTC", async (postId) => {
  const { data } = await CommentApi.getAllCommentsInPost(postId);
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
  name: "comments",
  initialState: initialState,
  reducers: {
    clearCommentsAC(state) {
      state.comments.items = [];
      state.comments.status = "loading";
    }
  },
  extraReducers: {
    [createCommentTC.pending]: (state) => {
      state.comments.status = "loading";
    },
    [createCommentTC.fulfilled]: (state, action) => {
      state.comments.items.push(action.payload);
      state.comments.status = "loaded";
    },
    [createCommentTC.rejected]: (state) => {
      state.comments.status = "error";
    }, [getAllCommentsTC.pending]: (state) => {
      state.comments.allComments = [];
      state.comments.status = "loading";
    },
    [getAllCommentsTC.fulfilled]: (state, action) => {
      state.comments.allComments = action.payload;
      state.comments.status = "loaded";
    },
    [getAllCommentsTC.rejected]: (state) => {
      state.comments.allComments = [];
      state.comments.status = "error";
    },
    [getAllCommentsInPostTC.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [getAllCommentsInPostTC.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [getAllCommentsInPostTC.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    [deleteCommentTC.pending]: (state, action) => {
      console.log(action.meta.arg);
      state.comments.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    },
    [deleteCommentTC.fulfilled]: (state, action) => {
      state.comments.status = action.payload.message;
    },
    [deleteCommentTC.rejected]: (state) => {
      state.comments.status = "error";
    }
  }
});
export const { clearCommentsAC } = commentSlice.actions;
export const commentsReducer = commentSlice.reducer;