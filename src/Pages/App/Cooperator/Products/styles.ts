import styled from "styled-components";
import theme from "../../../../Styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Title = styled.h1`
  color: #000;
  font-size: max(2vw, 20px);
  font-weight: bold;
`;

export const Category = styled.h2`
  color: #000;
  font-size: max(1.5vw, 15px);
  font-weight: bold;
`;

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductContainer = styled.div`
  background-color: ${theme.colors.dark};
  padding: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 15vw;
  height: 20vh;

  margin: 1vw;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const ProductImage = styled.img`
  width: max(5vw, 50px);
`;

export const ProdutctFooter = styled.div`
  display: flex;
  flexdirection: row;
  align-items: center;
`;

export const FooterSpan = styled.span`
  color: ${theme.colors.secondary};
  font-size: max(0.8vw, 8px);
  margin-left: 0.5vw;
  margin-right: 0.5vw;
`;

export const ProductSpan = styled.span`
  font-size: max(0.8vw, 8px);
`;

export const PlusButton = styled.button`
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const Wrapper = styled.div`
max-height: 85vh;
overflow-y: auto;
width:100vw;
`;
export const Body = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;
