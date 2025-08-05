import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/LearnMatesWebsite">
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
