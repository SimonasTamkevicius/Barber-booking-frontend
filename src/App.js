import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom"
import HomePage from "./components/HomePage";
import ChooseBarber from "./components/barbers/ChooseBarber";
import Settings from "./components/account/Account";
import { AuthProvider } from "./utils/AuthContext";
import ChooseService from "./components/barbers/ChooseService";
import ChooseTime from "./components/barbers/ChooseTime";
import BookAppointment from "./components/barbers/BookAppointment";
import SingleAppointment from "./components/account/accountComponents/SingleAppointment";
import BarberProtectedRoute from "../src/utils/BarberProtectedRoute";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/barbers" element={<ChooseBarber />} />
            <Route path="/ChooseService" element={<ChooseService />} />
            <Route path="/ChooseTime" element={<ChooseTime />} />
            <Route path="/BookAppointment" element={<BookAppointment />} />
            <Route element={<BarberProtectedRoute />}>
              <Route path="/singleAppointment" element={<SingleAppointment />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;
