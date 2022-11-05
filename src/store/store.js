import thunk from "redux-thunk";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postsReducer";
import { userReducer } from "./slices/userReducer";
import { commentsReducer } from "./slices/commentsReducer";
import { passwordReducer } from "./slices/changePasswordReducer";


// export type StateAppType = ReturnType<typeof reducersBox>;
const reducersBox = combineReducers({
  posts: postsReducer,
  user: userReducer,
  comments: commentsReducer,
  password:passwordReducer
});
export const store = configureStore({
  reducer: reducersBox,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
});

// export type AppDispatch = typeof store.dispatch;

