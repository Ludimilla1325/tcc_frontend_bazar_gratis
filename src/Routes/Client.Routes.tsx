import { FC } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  IndexRouteProps,
} from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import { ProdutosProvider } from "../Context/ProdutosContext";
import { ShoppingCartProvider } from "../Context/ShoppingCartContext";
import { EditPass } from "../Pages/App/Client/EditPass";
import { Home } from "../Pages/App/Client/Home";
import { app_base_url } from "../Utils/urls";

const ClientRoutes: FC = () => {
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
                path={`${app_base_url}/editPass`}
                element={<EditPass />}
              ></Route>
            </Routes>
          </Container>
        </Router>
      </ShoppingCartProvider>
    </ProdutosProvider>
  );
};

export default ClientRoutes;
