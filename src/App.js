import { PrivateRoute } from "components/PrivateRoute";
import { AuthProvider } from "hooks/useAuth";
import AccountPage from "pages/AccountPage";
import FullPage from "pages/FullPage";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={
          <PrivateRoute>
            <AccountPage />
          </PrivateRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/guide/:id" element={
          <PrivateRoute hasSubscribition={true}>
            <FullPage />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
