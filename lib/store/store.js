import { configureStore } from "@reduxjs/toolkit";
import sessionReducers from "./session";
import languageReducers from "./language";
import loadingReducers from "./loading";

export default configureStore({
  reducer: {
    session: sessionReducers,
    language: languageReducers,
    loading: loadingReducers,
  },
});
