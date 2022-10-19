import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../../api/userApi";
import { clearCommentsAC } from "./commentsReducer";

const initialState = {
  login: {
    items: {},
    status: "loading"
  },
  registration: {
    items: {},
    status: "registration"
  },
  authMe: {
    isAuth: false
  }
};
export const loginTC = createAsyncThunk("/auth/loginTC", async ({ email, password }, thunkAPI) => {
  const { data } = await UserApi.login(email, password);
  return data;
});
export const logoutTC = createAsyncThunk("/auth/logoutTC", async (arg, thunkAPI) => {
   await thunkAPI.dispatch(logoutAC("loading"));
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
export const authMeTC = createAsyncThunk("/auth/authMe", async () => {
  const { data } = await UserApi.authMe();
  return data;
});
export const updateUserStateTC = createAsyncThunk("/auth/updateUserState", async ({
                                                                                    fullName,
                                                                                    avatarUrl
                                                                                  }, thunkAPI) => {
  thunkAPI.dispatch(updateUserStateAC({ fullName, avatarUrl }));
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logoutAC(state, action) {
      state.login.items = {};
      state.login.status = action.payload;
      state.authMe.isAuth = false;
    },
    updateUserStateAC(state, action) {
      state.login.items.fullName = action.payload.fullName;
      state.login.items.avatarUrl = action.payload.avatarUrl;
    }
  },
  extraReducers: {
    [registrationTC.pending]: (state) => {
      state.registration.items = {};
      state.registration.status = "registration";
    },
    [registrationTC.fulfilled]: (state, action) => {
      state.registration.items = action.payload;
      state.registration.status = "registered";
      state.authMe.isAuth = true;
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
      state.login.status = "success";
      state.authMe.isAuth = true;
    },
    [loginTC.rejected]: (state) => {
      state.login.items = {};
      state.login.status = "error";
    },
    [authMeTC.pending]: (state) => {
      state.login.items = {};
      state.login.status = "loading";
    },
    [authMeTC.fulfilled]: (state, action) => {
      state.login.items = action.payload;
      state.login.status = "success";
      state.authMe.isAuth = true;
    },
    [authMeTC.rejected]: (state) => {
      state.login.items = {};
      state.login.status = "error";
    }
  }
});
export const { logoutAC, updateUserStateAC } = userSlice.actions;
export const userReducer = userSlice.reducer;