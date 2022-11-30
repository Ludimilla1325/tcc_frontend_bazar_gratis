import React, { FC } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  IndexRouteProps,
} from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import { ShoppingCartProvider } from "../Context/ShoppingCartContext";
import { Home } from "../Pages/App/Cooperator/Home";
import {ProdutosProvider}from "../Context/ProdutosContext";

import { app_base_url } from "../Utils/urls";
import { Cooperators } from "../Pages/App/Cooperator/Cooperators";
import { Products } from "../Pages/App/Cooperator/Products";
import {Purchase} from "../Pages/App/Cooperator/Purchase";
const AppRoutes: FC = () => {
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
            <Route path={`${app_base_url}/colaboradores`} element={<Cooperators />}></Route>
          </Routes>
          <Routes>
            <Route path={`${app_base_url}/produtos`} element={<Products />}></Route>
          </Routes>
          <Routes>
            <Route path={`${app_base_url}/pedidos`} element={<Purchase />}></Route>
          </Routes>
          
          
          
        </Container>
      </Router>
    </ShoppingCartProvider>
    </ProdutosProvider>
  );
};

export default AppRoutes;
