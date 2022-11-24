import { FC } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  IndexRouteProps,
} from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { ProdutosProvider } from "../Context/ProdutosContext";
import { ShoppingCartProvider } from "../Context/ShoppingCartContext";
import { EditPass } from "../Pages/App/Client/EditPass";
import { Home } from "../Pages/App/Client/Home";
import { PointsSolicitation } from "../Pages/App/Client/PointsSolicitation";
import { Profile } from "../Pages/App/Client/Profile";
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
            <Routes>
              <Route
                path={`${app_base_url}/pointsSolicitation`}
                element={<PointsSolicitation />}
              ></Route>
            </Routes>
            <Routes>
              <Route
                path={`${app_base_url}/profile`}
                element={<Profile />}
              ></Route>
            </Routes>
          </Container>
        </Router>
      </ShoppingCartProvider>
    </ProdutosProvider>
  );
};

export default ClientRoutes;
