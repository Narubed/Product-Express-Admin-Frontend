import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    language: "",
  },
  reducers: {
    setLanguage: (state, action) => {
      let name;
      name = action.payload;
      if (name && name.length > 0) {
        localStorage.setItem("language", name);
      } else {
        localStorage.removeItem("language");
      }
      return {
        ...state,
        language: name,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLanguage } = sessionSlice.actions;

export default sessionSlice.reducer;
