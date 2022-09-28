import { configureStore } from "@reduxjs/toolkit";
import sessionReducers from "./session";
import languageReducers from "./language";

export default configureStore({
  reducer: {
    session: sessionReducers,
    language: languageReducers,
  },
});
