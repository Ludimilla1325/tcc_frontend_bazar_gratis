import { Link } from "react-router-dom";
import styled from "styled-components";

export const SidebarNav = styled.div<{ sidebar: boolean }>`
  width: 250px;
  height: 100vh;
  background: darkblue;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 1;
`;

export const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  font-size: 2rem;
  margin-left: 2rem;
`;

export const SidebarTitle = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  font-size: 1.2rem;
  margin-left: 2rem;
  color: white;
`;

export const Line = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: white;
`;

export const SidebarWrap = styled.div``;
