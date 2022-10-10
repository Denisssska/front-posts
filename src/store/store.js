import thunk from "redux-thunk";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postsReducer";
import { userReducer } from "./slices/userReducer";


// export type StateAppType = ReturnType<typeof reducersBox>;
const reducersBox = combineReducers({
  posts: postsReducer,
  user: userReducer
});
export const store = configureStore({
  reducer: reducersBox,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
});

// export type AppDispatch = typeof store.dispatch;

