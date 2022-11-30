import styled from "styled-components";
import theme from "../../../Styles/theme";

export const Container = styled.div`
  border-radius: 0.25rem;
  background-color: ${theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const DivX = styled.div`
  text-align: right;
  color: ${theme.colors.fullDark};
  width: 100%;
`;

export const Title = styled.h1`
  color: ${theme.colors.primary};
  font-size: max(1vw + 8px);
  margin-bottom: 2vh;
  text-align: center;
`;

export const Message = styled.span`
  color: ${theme.colors.fullDark};
  font-size: max(0.6vw + 6px);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const ProductContrainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;

  background-color: ${theme.colors.dark};
  padding: 0.8vw;
  min-width: 50%;
  border-radius: 0.25rem;
  margin-bottom: 1vh;
`;

export const ProductsInformationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Image = styled.img`
  height: max(50px, 5vw);
  height: width(50px, 5vw);
`;

export const ProductTitle = styled.h5`
  font-size: max(0.8vw + 8px);
  font-weight: bold;
`;

export const ProductFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const SpanFooter = styled.span`
  font-size: max(0.6vw + 6px);
  font-weight: bold;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

export const OperationButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.light};
  padding: 0.5vw;
  min-width:10vw;
  border-radius: 0.25rem;
  font-size: max(0.8vw, 8px);
  margin-left:5vw;
`;
