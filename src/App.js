import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage";
import ChooseBarber from "./components/barbers/ChooseBarber";
import Settings from "./components/account/Account";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/barbers" element={<ChooseBarber />} />
            {/* <Route element={<ProtectedRoute />}>
            </Route> */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
