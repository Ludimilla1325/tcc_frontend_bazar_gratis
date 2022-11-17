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
import { Home } from "../Pages/App/Home";
import {ProdutosProvider}from "../Context/ProdutosContext";

import { app_base_url } from "../Utils/urls";
import { PurchasesHistoric } from "../Pages/App/Client/PurchasesHistoric";

const AppRoutes: FC = () => {
  return (
    <ProdutosProvider>
    <ShoppingCartProvider>
      <Router>
        <Sidebar />
        <Container className="mb-4">
          <Routes>
            <Route path={`${app_base_url}/loja`} element={<Home />}></Route>
          </Routes>

          <Routes>
            <Route path={`${app_base_url}/historico-de-compras`} element={<PurchasesHistoric />}></Route>
          </Routes>

          
        </Container>
      </Router>
    </ShoppingCartProvider>
    </ProdutosProvider>
  );
};

export default AppRoutes;
