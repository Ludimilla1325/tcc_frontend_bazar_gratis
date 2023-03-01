import React, { FC } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { ShoppingCartProvider } from "../Context/ShoppingCartContext";
import { ProdutosProvider } from "../Context/ProdutosContext";

const AppRoutes: FC = () => {
  return (
    <ProdutosProvider>
      <ShoppingCartProvider>
        <Router>
          <Sidebar />
          <Container className="mb-4"></Container>
        </Router>
      </ShoppingCartProvider>
    </ProdutosProvider>
  );
};

export default AppRoutes;
