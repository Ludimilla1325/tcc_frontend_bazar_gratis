import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  IndexRouteProps,
} from "react-router-dom";
import { Login } from "../Pages/Auth/Login";

import { app_base_url } from "../Utils/urls";

export function AuthRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={`${app_base_url}/login`} element={<Login />}></Route>
      </Routes>
    </Router>
  );
}
