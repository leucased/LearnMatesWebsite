import React from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminMenuProvider } from "./contexts/AdminMenuContext";

const App = () => {
  return (
    <AuthProvider>
      <AdminMenuProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </AdminMenuProvider>
    </AuthProvider>
  );
};

export default App;
