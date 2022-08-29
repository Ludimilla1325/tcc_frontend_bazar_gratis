import React, { FC } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  IndexRouteProps,
} from "react-router-dom";
import Sidebar from "../components/Layoult/Sidebar";
import { Home } from "../Pages/App/Home";

import { app_base_url } from "../Utils/urls";

const AppRoutes: FC = () => {
  return (
    <Router>
      <Sidebar />
      <Container className="mb-4">
        <Routes>
          <Route path={`${app_base_url}/Home`} element={<Home />}></Route>
        </Routes>
      </Container>
    </Router>
  );
};

export default AppRoutes;
