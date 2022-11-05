import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChangePassword } from "../../api/password.api";


const initialState = {
  message: "",
  status: "loading"
};
export const forgotPasswordTC = createAsyncThunk("/auth/forgotPasswordTC", async ({ email }, thunkAPI) => {
  try {
    const { data } = await ChangePassword.forgotPass(email);
    return data;
  } catch (e) {
    thunkAPI.rejectWithValue(e.message);
  }
});


const passwordSlice = createSlice({
  name: "password",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [forgotPasswordTC.pending]: (state) => {
      state.message = "";
      state.status = "loading";
    },
    [forgotPasswordTC.fulfilled]: (state, action) => {
      state.message = action.payload.message;
      state.status = "loaded";
    },
    [forgotPasswordTC.rejected]: (state) => {
      state.message = "";
      state.status = "error";
    }
  }
});

export const passwordReducer = passwordSlice.reducer;