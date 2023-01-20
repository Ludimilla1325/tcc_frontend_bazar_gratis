import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../../../Pages/App/Home/styles";
import { IconContext } from "react-icons";
import { FiLogOut } from "react-icons/fi";
import { useShoppingCart } from "../../../Context/ShoppingCartContext";
import { useCliente } from "../../../Hooks/cliente";
import { useCooperator } from "../../../Hooks/cooperator";
import { useMaster } from "../../../Hooks/master";
import {
  HelperIcons,
  Nav,
  NavCart,
  NavIcon,
  NavLeft,
  Subtitle,
} from "./styles";

const Navbar: FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const { cliente } = useCliente();
  const { cooperator } = useCooperator();
  const { master } = useMaster();
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <IconContext.Provider value={{ color: "white" }}>
      <Nav>
        <Subtitle>BAZAR GRÁTIS</Subtitle>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <a href="url">
            <p style={{ margin: "8px", color: "white" }}>Home</p>
          </a>
          <a href="login">
            <p style={{ margin: "8px", color: "white" }}> Login</p>
          </a>
          <a href="register">
            <p style={{ margin: "8px", color: "white" }}>Cadastrar</p>
          </a>
        </div>
      </Nav>
    </IconContext.Provider>
  );
};
export default Navbar;
