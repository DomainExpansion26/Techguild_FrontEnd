import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  type: "info", // "success" | "error" | "warning" | "info"
  duration: 4000,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = typeof action.payload === "string" ? action.payload : (action.payload.message || "");
      state.type = (typeof action.payload === "object" && action.payload.type) || "info";
      state.duration = (typeof action.payload === "object" && action.payload.duration) || 4000;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
