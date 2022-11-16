import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  IndexRouteProps,
} from "react-router-dom";
import { ClientLogin } from "../Pages/Auth/ClientLogin";
import { CooperatorLogin } from "../Pages/Auth/CooperatorLogin";
import { MasterLogin } from "../Pages/Auth/MasterLogin";
import { app_base_url } from "../Utils/urls";

export function AuthRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={`${app_base_url}/login`} element={<ClientLogin />}></Route>
      </Routes>
      <Routes>
        <Route path={`${app_base_url}/cooperator-login`} element={<CooperatorLogin />}></Route>
      </Routes>
      <Routes>
        <Route path={`${app_base_url}/master-login`} element={<MasterLogin />}></Route>
      </Routes>
    </Router>
  );
}
