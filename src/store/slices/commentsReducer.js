import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CommentApi } from "../../api/commentsApi";

const initialState = {
  comments: {
    items: [],
    process: "empty",
    lastComments: [],
    status: "loading",
    isCommentDeleted: false
  }
};
export const createCommentTC = createAsyncThunk("/comments/createCommentTC", async ({
                                                                                      comment,
                                                                                      postId
                                                                                    }, { rejectWithValue }) => {
  try {
    const { data } = await CommentApi.createComment({ comment, postId });
    return data;
  } catch (e) {
    rejectWithValue(e.message);
  }
});

export const getLastCommentsTC = createAsyncThunk("/comments/getLastCommentsTC", async (_, { rejectWithValue }) => {
  try {
    const { data } = await CommentApi.getLastComments();
    return data;
  } catch (e) {
    rejectWithValue(e.message);
  }

});
export const getAllCommentsInPostTC = createAsyncThunk("/comments/getAllCommentsInPostTC", async ({ postId }, { rejectWithValue }) => {
  try {
    const { data } = await CommentApi.getAllCommentsInPost(postId);
    return data;
  } catch (e) {
    rejectWithValue(e.message);
  }
});
export const updateCommentTC = createAsyncThunk("/comments/updateCommentTC", async ({
                                                                                      commentId,
                                                                                      payload
                                                                                    }, { rejectWithValue }) => {

  try {
    const { data } = await CommentApi.updateComment(commentId, payload);
    console.log(data);
  } catch (e) {
    rejectWithValue(e.message);
  }
});
export const deleteCommentTC = createAsyncThunk("/comments/deleteCommentTC", async ({ commentId }, { rejectWithValue }) => {
  try {
    const { data } = await CommentApi.deleteComment(commentId);
    alert(data.message);
    return data;
  } catch (e) {
    rejectWithValue(e.message);
  }
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
      state.comments.process = "empty";
    },
    [createCommentTC.fulfilled]: (state, action) => {
      // state.comments.items.push(action.payload);
      state.comments.process = "well";
    },
    [createCommentTC.rejected]: (state) => {
      state.comments.process = "error";
    },
    [getLastCommentsTC.pending]: (state) => {
      state.comments.lastComments = [];
      state.comments.status = "loading";
    },
    [getLastCommentsTC.fulfilled]: (state, action) => {
      state.comments.lastComments = action.payload;
      state.comments.status = "loaded";
    },
    [getLastCommentsTC.rejected]: (state) => {
      state.comments.lastComments = [];
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
      state.comments.items = state.comments.items.filter(obj => obj._id !== action.meta.arg);
    },
    [deleteCommentTC.fulfilled]: (state, action) => {
      state.comments.isCommentDeleted = true;
      state.comments.status = action.payload.message;
    },
    [deleteCommentTC.rejected]: (state) => {
      state.comments.status = "error";
    }
  }
});
export const { clearCommentsAC } = commentSlice.actions;
export const commentsReducer = commentSlice.reducer;