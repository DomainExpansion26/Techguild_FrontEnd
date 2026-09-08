import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import snackbarReducer, { showSnackbar, hideSnackbar } from "./slices/snackbarSlice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export { showSnackbar, hideSnackbar };
export { useAuth, AuthProvider } from "@/context/AuthContext";
export default store;
