import styled from "styled-components";
import theme from "../../../Styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Title = styled.h1`
  color: ${theme.colors.primary};
`;
export const Subtitle = styled.h2`
  color: ${theme.colors.primary};
`;
export const Label = styled.label``;
export const Input = styled.input`
  color: ${theme.colors.light};
`;
export const Span = styled.span`
  color: ${theme.colors.primary};
`;
export const LoginButton = styled.button`
  background-color: ${theme.colors.secondary};
`;
