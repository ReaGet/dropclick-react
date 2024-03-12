import AccountPage from "pages/AccountPage";
import FavorPage from "pages/FavorPage";
import FullPage from "pages/FullPage";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import WalletPage from "pages/WalletPage";

import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/guide/:id" element={<FullPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      { /* />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/account" element={<AccountPage />} /> */}
      {/* <Route path="/favorites" element={<FavorPage />} /> */}
    </Routes>
  );
}

export default App;
