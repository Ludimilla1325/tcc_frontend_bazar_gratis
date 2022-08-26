import styled from "styled-components";
import theme from "../../../Styles/theme";

export const Container = styled.div`
  background-color: ${theme.colors.primary};
`;

export const Title = styled.h1`
  color: ${theme.colors.secondary};
`;


export const  LoginButton = styled.button`

    width: 40%;
    background-color: ${theme.colors.light};
    color: ${theme.colors.primary};

`;