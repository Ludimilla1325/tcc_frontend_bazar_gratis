import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../../Pages/App/Home/styles";
import { IconContext } from "react-icons";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { SidebarData } from "./SidebarData";
import SidebarLink from "./Submenu";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  background: deeppink;
  position: static;
`;

const SidebarNav = styled.div<{ sidebar: boolean }>`
  width: 250px;
  height: 100vh;
  background: darkblue;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
`;

const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  font-size: 2rem;
  margin-left: 2rem;
`;

const SidebarTitle = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  font-size: 1.2rem;
  margin-left: 2rem;
  color: white;
`;

const Line = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const LittleLine = styled.span`
  border-left: 2px solid white;
  height: 4rem;
  position: absolute;
  margin-left: 80rem;
  top: 0;
`;

const NavCart = styled(Link)`
  display: flex;
  align-items: center;
  height: 4rem;
  width: 4rem;
  font-size: 2rem;
  position: absolute;
  margin-left: 110rem;
`;

const NavLeft = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  height: 4rem;
  font-size: 2rem;
  margin-left: 115rem;
`;

const NavName = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 4rem;
  font-size: 1rem;
  margin-left: 100
  color: white;
`;

const SidebarWrap = styled.div``;

const Sidebar: FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <IconContext.Provider value={{ color: "white" }}>
      <Nav>
        <NavIcon to="#" onClick={showSidebar}>
          <AiOutlineMenu />
        </NavIcon>

        {cartQuantity > 0 && (
          <NavCart className="rounded-circle" to="#" onClick={openCart}>
            <AiOutlineShoppingCart />

            <div
              className="rounded-circle white d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "0.3rem",
                height: "0.5rem",
                bottom: 1,
                right: 0,
              }}
            >
              {cartQuantity}
            </div>
          </NavCart>
        )}
        <NavLeft to="#" onClick={showSidebar}>
          <FiLogOut />
        </NavLeft>
      </Nav>

      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to="#" onClick={showSidebar}>
            <AiOutlineClose />
          </NavIcon>
          <SidebarTitle>MCGI FREE STORE</SidebarTitle>
          <Line></Line>
          {SidebarData.map((item: any, index) => {
            return <SidebarLink item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
};
export default Sidebar;
