import { Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
  height: 3rem;
  background: deeppink;
  position: static;
`;

export const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  font-size: 2rem;
  margin-left: 2rem;
`;

export const NavCart = styled(Link)`
  display: flex;
  align-items: center;
  height: 4rem;
  width: 40rem;
  font-size: 2rem;
`;

export const NavLeft = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  font-size: 2rem;
`;

export const HelperIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: ${window.screen.width > window.screen.height ? "10%" : "30%"};
`;

export const Title = styled.h1`
  color: white;
  font-size: max(2.5vw, 25px);
  font-weight: bold;
  margin-top: 10vh;
`;
export const Subtitle = styled.h2`
  color: white;
  font-weight: bold;
  margin-top: 1ch;
  margin-left: 3ch;
  font-size: max(1vw, 10px);
`;
