import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../../../Pages/App/Home/styles";
import { IconContext } from "react-icons";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import {
  SidebarDataClient,
  SidebarDataAdmin,
  SidebarDataMaster,
  SidebarDataOperator,
} from "./SidebarData";
import SidebarLink from "./Submenu";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "../../../Context/ShoppingCartContext";
import { useCliente } from "../../../Hooks/cliente";
import { useCooperator } from "../../../Hooks/cooperator";
import { useMaster } from "../../../Hooks/master";
import Navbar from "../Navbar/Navbar";
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
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
  z-index: 1;
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
  margin-left: 80rem;
  top: 0;
`;

const NavCart = styled(Link)`
  display: flex;
  align-items: center;
  height: 4rem;
  width: 40rem;
  font-size: 2rem;
`;

const NavLeft = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  font-size: 2rem;
`;

const NavName = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 4rem;
  font-size: 1rem;
  margin-left: 100;
  color: white;
`;

const HelperIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: ${window.screen.width > window.screen.height ? "10%" : "30%"};
`;

const SidebarWrap = styled.div``;

const Sidebar: FC = () => {
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
        <NavIcon to="#" onClick={showSidebar}>
          <AiOutlineMenu />
        </NavIcon>

        <HelperIcons>
          <span>SALDO:{cliente.points}</span>

          <span>{cliente.name}</span>
          {cliente.id ? (
            <>
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
            </>
          ) : (
            ""
          )}

          <NavLeft to="#" onClick={showSidebar}>
            <FiLogOut />
          </NavLeft>
        </HelperIcons>
      </Nav>

      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to="#" onClick={showSidebar}>
            <AiOutlineClose />
          </NavIcon>
          <SidebarTitle>BAZAR GRÁTIS</SidebarTitle>
          <Line></Line>
          {cliente.id ? (
            <>
              {SidebarDataClient.map((item: any, index: any) => {
                return <SidebarLink item={item} key={index} />;
              })}
            </>
          ) : (
            ""
          )}{" "}
          {cooperator.id && cooperator.admin == false ? (
            <>
              {SidebarDataOperator.map((item: any, index: any) => {
                return <SidebarLink item={item} key={index} />;
              })}
            </>
          ) : (
            ""
          )}
          {cooperator.id && cooperator.admin == true ? (
            <>
              {SidebarDataAdmin.map((item: any, index: any) => {
                return <SidebarLink item={item} key={index} />;
              })}
            </>
          ) : (
            ""
          )}
          {master.id ? (
            <>
              {SidebarDataMaster.map((item: any, index: any) => {
                return <SidebarLink item={item} key={index} />;
              })}
            </>
          ) : (
            ""
          )}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
};
export default Sidebar;
