import styled from "styled-components";
import theme from "../../../Styles/theme";

export const Container = styled.div`
  border-radius: 0.25rem;
  background-color: ${theme.colors.light};
`;

export const DivX = styled.div`
  text-align: right;
  color: ${theme.colors.fullDark};
`;

export const Title = styled.h1`
  color: ${theme.colors.primary};
  font-size: max(1vw + 8px);
  margin-bottom: 2vh;
`;

export const Message = styled.span`
  color: ${theme.colors.fullDark};
  font-size: max(0.6vw + 6px);
`;
