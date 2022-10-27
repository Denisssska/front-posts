import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostApi } from "../../api/postsApi";

const initialState = {
  posts: {
    items: [],
    onePost: {},
    createdPost: {},
    status: "loading",
    isUpdated: false,
    createdId: "",
    sortByItem: "createdAt"
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
export const createPostTC = createAsyncThunk("/posts/createPostTC", async ({ payload }) => {
  try {
    const { data } = await PostApi.createPost(payload);
    return data;
  } catch (e) {
    console.warn(e);
    alert("Ошибка при создании статьи");
  }

});
export const getPostsTC = createAsyncThunk("/posts/getPostsTC", async ({ sorts }, thunkAPI) => {
  thunkAPI.dispatch(changeSortBy(sorts));
  const { data } = await PostApi.getPosts(sorts);
  return data;
});
export const getOnePostTC = createAsyncThunk("/posts/getOnePostTC", async ({ postId }) => {
  try {
    const { data } = await PostApi.getOnePost(postId);
    return data;
  } catch (e) {
    console.warn(e);
    alert("Ошибка при получении статьи");
  }
});
export const deletePostTC = createAsyncThunk("/posts/deletePostTC", async (postId) => {
  const { data } = await PostApi.deletePost(postId);
  return data;
});
export const updatePostTC = createAsyncThunk("/posts/updatePostTC", async ({ postId, payload }) => {
  const { data } = await PostApi.updatePost(postId, payload);
  return data;
});

export const getTagsTC = createAsyncThunk("/posts/getTagsTC", async () => {
  const { data } = await PostApi.getTags();
  return data;
});
const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    changeSortBy(state, action) {
      state.posts.sortByItem = action.payload;
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
    [createPostTC.rejected]: (state) => {
      state.posts.createdPost = {};
      state.posts.status = "error";
    },
    [getOnePostTC.pending]: (state) => {
      state.posts.onePost = {};
      state.posts.status = "loading";
    },
    [getOnePostTC.fulfilled]: (state, action) => {
      state.posts.onePost = action.payload;
      state.posts.status = "loaded";
    },
    [getOnePostTC.rejected]: (state) => {
      state.posts.onePost = {};
      state.posts.status = "error";
    },
    [updatePostTC.pending]: (state) => {
      state.posts.isUpdated = false;
    },
    [updatePostTC.fulfilled]: (state) => {
      state.posts.isUpdated = true;
    },
    [updatePostTC.rejected]: (state) => {
      state.posts.isUpdated = false;
      state.posts.status = "error";
    },
    // [getAllCommentsTC.pending]: (state) => {
    //   state.comments.items = [];
    //   state.comments.status = "loading";
    // },
    // [getAllCommentsTC.fulfilled]: (state, action) => {
    //   state.comments.items = action.payload;
    //   state.comments.status = "loaded";
    // },
    // [getAllCommentsTC.rejected]: (state) => {
    //   state.comments.items = [];
    //   state.comments.status = "error";
    // },
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
      //console.log(action.meta.arg);
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
export const { changeSortBy } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;