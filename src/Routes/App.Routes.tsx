import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  IndexRouteProps,
} from "react-router-dom";
import { Home } from "../Pages/App/Home";

import { app_base_url } from "../Utils/urls";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={`${app_base_url}/Home`} element={<Home />}></Route>
      </Routes>
    </Router>
  );
}
