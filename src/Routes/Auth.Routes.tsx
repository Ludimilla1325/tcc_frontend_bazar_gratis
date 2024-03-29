import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Layout/Navbar/Navbar";
import { ForgotPass } from "../Pages/App/Client/ForgotPass";
import { ClientLogin } from "../Pages/Auth/ClientLogin";
import { ClientRegister } from "../Pages/Auth/ClientRegister";
import { CooperatorLogin } from "../Pages/Auth/CooperatorLogin";
import { Home } from "../Pages/Auth/Home";
import { MasterLogin } from "../Pages/Auth/MasterLogin";
import { app_base_url } from "../Utils/urls";

export function AuthRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={`${app_base_url}/home`} element={<Home />}></Route>
      </Routes>
      <Routes>
        <Route
          path={`${app_base_url}/register`}
          element={<ClientRegister />}
        ></Route>
      </Routes>
      <Routes>
        <Route
          path={`${app_base_url}/reset-pass`}
          element={<ForgotPass />}
        ></Route>
      </Routes>
      <Routes>
        <Route path={`${app_base_url}/login`} element={<ClientLogin />}></Route>
      </Routes>
      <Routes>
        <Route
          path={`${app_base_url}/cooperator-login`}
          element={<CooperatorLogin />}
        ></Route>
      </Routes>
      <Routes>
        <Route
          path={`${app_base_url}/master-login`}
          element={<MasterLogin />}
        ></Route>
      </Routes>
    </Router>
  );
}
