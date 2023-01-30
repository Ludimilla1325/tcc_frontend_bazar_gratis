import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { app_base_url } from "../../../Utils/urls";
import theme from "../../../Styles/theme";
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
  justify-content: space-between;
  width: ${window.screen.width > window.screen.height ? "10%" : "30%"};
  width: 100%;
  padding: 0.5vw;
  font-size: max(12px,1.2vw);
  color:${theme.colors.light}
`;

const SidebarWrap = styled.div``;

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const clienteHook = useCliente();
  const cooperatorHook = useCooperator();
  const masterHook = useMaster();
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <IconContext.Provider value={{ color: "white" }}>
      <Nav>
       

        <HelperIcons>
        <NavIcon to="#" onClick={showSidebar}>
          <AiOutlineMenu size={"max(18px,2vw)"}/>
        </NavIcon>
          {cooperatorHook.cooperator.id ? (
            <span>{cooperatorHook.cooperator.name}</span>
          ) : (
            ""
          )}

          {masterHook.master.id ? <span>{masterHook.master.name}</span> : ""}
          {clienteHook.cliente.id ? (
            <>
              <span>SALDO:{clienteHook.cliente.points}</span>

              <span>{clienteHook.cliente.name}</span>

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

          <NavLeft
            to="#"
            onClick={() => {
              clienteHook.logOut();
              masterHook.logOut();
              cooperatorHook.logOut();
              navigate(`${app_base_url}/home`);
            }}
          >
            <FiLogOut size={"max(18px,2vw)"}/>
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
          {clienteHook.cliente.id ? (
            <>
              {SidebarDataClient.map((item: any, index: any) => {
                return <SidebarLink item={item} key={index} />;
              })}
            </>
          ) : (
            ""
          )}{" "}
          {cooperatorHook.cooperator.id &&
          cooperatorHook.cooperator.admin === false ? (
            <>
              {SidebarDataOperator.map((item: any, index: any) => {
                return <SidebarLink item={item} key={index} />;
              })}
            </>
          ) : (
            ""
          )}
          {cooperatorHook.cooperator.id &&
          cooperatorHook.cooperator.admin === true ? (
            <>
              {SidebarDataAdmin.map((item: any, index: any) => {
                return <SidebarLink item={item} key={index} />;
              })}
            </>
          ) : (
            ""
          )}
          {masterHook.master.id ? (
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
