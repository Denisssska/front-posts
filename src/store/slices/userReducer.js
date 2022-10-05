import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostApi } from "../../api/postsApi";
import { UserApi } from "../../api/userApi";

const initialState = {
  user: {
    login: {
      items: {},
      status: "success"
    },
    registration: {
      items: {},
      status: "registration"
    },
    authMe:{
      token:''
    }

  }
};
export const loginTC = createAsyncThunk("/auth/loginTC", async ({ email, password }, thunkAPI) => {
  const { data } = await UserApi.login(email, password);
  return data;
});
export const registrationTC = createAsyncThunk("/auth/registrationTC", async ({
                                                                                email,
                                                                                password,
                                                                                fullName,
                                                                                avatarUrl
                                                                              }) => {
  const { data } = await UserApi.registration({ email, password, fullName, avatarUrl });
  return data;
});
export const authMeTC = createAsyncThunk("/auth/authMe", async ({ token }) => {
  const { data } = await UserApi.authMe(token);
  return data;
});
const postsSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [registrationTC.pending]: (state) => {
      state.registration.items = {};
      state.registration.status = "registration";
    },
    [registrationTC.fulfilled]: (state, action) => {
      state.registration.items = action.payload;
      state.registration.status = "registered";
    },
    [registrationTC.rejected]: (state) => {
      state.registration.items = {};
      state.registration.status = "error";
    },
    [loginTC.pending]: (state) => {
      state.login.items = {};
      state.login.status = "loading";
    },
    [loginTC.fulfilled]: (state, action) => {
      state.login.items = action.payload;
      state.login.status = "loaded";
    },
    [loginTC.rejected]: (state) => {
      state.login.items = {};
      state.login.status = "error";
    }
  }
});

export const postsReducer = postsSlice.reducer;