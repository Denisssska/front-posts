import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostApi } from "../../api/postsApi";

const initialState = {
  posts: {
    items: [],
    onePost: {},
    createdPost: {},
    status: "loading",
    isUpdated: false,
    sortByItem: "createdAt",
    error:null
  },
  tags: {
    items: [],
    status: "loading"
  },
  comments: {
    items: [],
    status: "loading"
  }
};
export const createPostTC = createAsyncThunk("/posts/createPostTC", async ({ payload }, thunkAPI) => {
  try {
    const { data } = await PostApi.createPost(payload);
    return data;
  } catch (e) {
    console.log(e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }

});
export const getPostsTC = createAsyncThunk("/posts/getPostsTC", async ({ sorts }, thunkAPI) => {
  thunkAPI.dispatch(changeSortBy(sorts));
  try {
    const { data } = await PostApi.getPosts(sorts);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }


});
export const getOnePostTC = createAsyncThunk("/posts/getOnePostTC", async ({ postId }, thunkAPI) => {
  try {
    const { data } = await PostApi.getOnePost(postId);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
export const deletePostTC = createAsyncThunk("/posts/deletePostTC", async (postId, thunkAPI) => {
  try {
    const { data } = await PostApi.deletePost(postId);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }

});
export const updatePostTC = createAsyncThunk("/posts/updatePostTC", async ({ postId, payload }, thunkAPI) => {
  try {
    const { data } = await PostApi.updatePost(postId, payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const getTagsTC = createAsyncThunk("/posts/getTagsTC", async (_, thunkAPI) => {
  try {
    const { data } = await PostApi.getTags();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }

});
const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    changeSortBy(state, action) {
      state.posts.sortByItem = action.payload;
    },
    changePostsStatus(state) {
      state.posts.status = "loading";
    }
  },
  extraReducers: {
    [createPostTC.pending]: (state) => {
      state.posts.createdPost = {};
      state.posts.status = "loading";
    },
    [createPostTC.fulfilled]: (state, action) => {
      state.posts.createdPost = action.payload;
      state.posts.status = "loaded";
    },
    [createPostTC.rejected]: (state, action) => {
      state.posts.createdPost = {};
      state.posts.status = action.payload;
      state.posts.error = action.error.message
    },
    [getOnePostTC.pending]: (state) => {
      state.posts.onePost = {};
      state.posts.status = "loading";
    },
    [getOnePostTC.fulfilled]: (state, action) => {
      state.posts.onePost = action.payload;
      state.posts.status = "loaded";
    },
    [getOnePostTC.rejected]: (state, action) => {
      state.posts.onePost = {};
      state.posts.status = action.payload;
      state.posts.error = action.error.message
    },
    [updatePostTC.pending]: (state) => {
      state.posts.isUpdated = false;
    },
    [updatePostTC.fulfilled]: (state) => {
      state.posts.isUpdated = true;
    },
    [updatePostTC.rejected]: (state,action) => {
      state.posts.isUpdated = false;
      state.posts.status = "error";
      state.posts.error = action.error.message

    },
    [getPostsTC.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [getPostsTC.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [getPostsTC.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = action.payload;
      state.posts.error = action.error.message;
    },
    [getTagsTC.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [getTagsTC.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [getTagsTC.rejected]: (state, action) => {
      state.tags.items = [];
      state.tags.status = action.payload;
    },
    [deletePostTC.pending]: (state, action) => {
      //console.log(action.meta.arg);
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    },
    [deletePostTC.fulfilled]: (state, action) => {
      state.posts.status = action.payload.message;
    },
    [deletePostTC.rejected]: (state, action) => {
      state.posts.status = action.payload;
      state.posts.error = action.error.message;
    }
  }
});
export const { changeSortBy, viewError, changePostsStatus } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;