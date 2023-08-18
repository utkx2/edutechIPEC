import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainRoutes from "./Routes/MainRoutes";
import DashboardRoutes from "./Routes/DashboardRoutes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/*" element={<MainRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        {/* <Route path="/demo" element={<UserCards />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;