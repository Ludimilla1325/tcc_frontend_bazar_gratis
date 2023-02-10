import React, { FC } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { ShoppingCartProvider } from "../Context/ShoppingCartContext";
import { Home } from "../Pages/App/Cooperator/Home";
import { ProdutosProvider } from "../Context/ProdutosContext";

import { app_base_url } from "../Utils/urls";
import { Cooperators } from "../Pages/App/Cooperator/Cooperators";
import { Products } from "../Pages/App/Cooperator/Products";
import { CreateAndEditProduct } from "../Pages/App/Cooperator/Products/Create_Edit";
import { Purchase } from "../Pages/App/Cooperator/Purchase";
import { PointsSolicitation } from "../Pages/App/Cooperator/PointsSolicitation";
import { Profile } from "../Pages/App/Cooperator/Profile";
import { EditPass } from "../Pages/App/Cooperator/EditPass";
import DashboardAdmin from "../Pages/App/Cooperator/Dashboard/Dashboard";
import { CooperatorRegister } from "../Pages/App/Master/Employee";
import { Appointment } from "../Pages/App/Cooperator/HorariosDisponíveis";
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
              <Route
                path={`${app_base_url}/profile`}
                element={<Profile />}
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
                path={`${app_base_url}/create-products`}
                element={<CreateAndEditProduct />}
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
                path={`${app_base_url}/points-solicitation`}
                element={<PointsSolicitation />}
              ></Route>
            </Routes>
            <Routes>
              <Route
                path={`${app_base_url}/pedidos`}
                element={<Purchase />}
              ></Route>
            </Routes>
            <Routes>
              <Route
                path={`${app_base_url}/editPass`}
                element={<EditPass />}
              ></Route>
            </Routes>
            <Routes>
              <Route
                path={`${app_base_url}/dashboard`}
                element={<DashboardAdmin />}
              ></Route>
            </Routes>{" "}
            <Routes>
              <Route
                path={`${app_base_url}/create-cooperator`}
                element={<CooperatorRegister />}
              ></Route>
            </Routes>
            <Routes>
              <Route
                path={`${app_base_url}/appointments`}
                element={<Appointment />}
              ></Route>
            </Routes>
          </Container>
        </Router>
      </ShoppingCartProvider>
    </ProdutosProvider>
  );
};

export default AppRoutes;
