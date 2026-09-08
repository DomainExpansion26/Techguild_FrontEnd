import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "@/context/AuthContext";
import { Snackbar } from "@/Components/feedback";

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
        <Snackbar />
      </AuthProvider>
    </Provider>
  );
}

export default AppProviders;
