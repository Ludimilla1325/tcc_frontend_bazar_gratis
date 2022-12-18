import React, { FC } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  IndexRouteProps,
} from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { ShoppingCartProvider } from "../Context/ShoppingCartContext";
import { Home } from "../Pages/App/Cooperator/Home";
import { ProdutosProvider } from "../Context/ProdutosContext";

import { app_base_url } from "../Utils/urls";
import { Cooperators } from "../Pages/App/Cooperator/Cooperators";
import { Products } from "../Pages/App/Cooperator/Products";
import { Stores } from "../Pages/App/Master/Stores";
import { CooperatorRegister } from "../Pages/App/Master/Employee";
import Dashboard from "../Pages/App/Master/Dashboard/Dashboard";

const MasterRoutes: FC = () => {
  return (
    <ProdutosProvider>
      <ShoppingCartProvider>
        <Router>
          <Sidebar />
          <Container className="mb-4">
            <Routes>
              <Route path={`${app_base_url}/Home`} element={<Home />}></Route>
            </Routes>
            <Routes>
              <Route
                path={`${app_base_url}/dashboard`}
                element={<Dashboard />}
              ></Route>
            </Routes>
            <Routes>
              <Route
                path={`${app_base_url}/colaboradores`}
                element={<Cooperators />}
              ></Route>
            </Routes>
            <Routes>
              <Route
                path={`${app_base_url}/create-cooperator`}
                element={<CooperatorRegister />}
              ></Route>
            </Routes>
            <Routes>
              <Route
                path={`${app_base_url}/produtos`}
                element={<Products />}
              ></Route>
            </Routes>

            <Routes>
              <Route
                path={`${app_base_url}/lojas`}
                element={<Stores />}
              ></Route>
            </Routes>

            <Routes>
              <Route
                path={`${app_base_url}/funcionarios/:storeId`}
                element={<Cooperators />}
              ></Route>
            </Routes>

            <Routes>
              <Route
                path={`${app_base_url}/produtos/:storeId`}
                element={<Products />}
              ></Route>
            </Routes>
          </Container>
        </Router>
      </ShoppingCartProvider>
    </ProdutosProvider>
  );
};

export default MasterRoutes;
