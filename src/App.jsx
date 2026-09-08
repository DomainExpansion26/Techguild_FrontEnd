import React from "react";
import AppProviders from "./app/providers";
import AppRoutes from "./app/AppRoutes";
import "./App.css";

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
