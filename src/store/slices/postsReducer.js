import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PostApi} from "../../api/postsApi";

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}
export const getPostsTC = createAsyncThunk('/posts/getPostsTC', async () => {
    const {data} = await PostApi.getPosts()
    return data
})
const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getPostsTC.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [getPostsTC.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [getPostsTC.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },
    }
})

export const postsReducer = postsSlice.reducer