import { configureStore } from "@reduxjs/toolkit";
import shareReducer from "../store/features/shareSlice";
import userInfoReducer from "../store/features/userInfoSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  userDetail: shareReducer,
  userInfo: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  // reducer: {
  // userDetail: shareReducer,
  // userInfo: userInfoReducer,
  // },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
