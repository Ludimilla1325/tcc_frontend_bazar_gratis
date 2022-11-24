import styled from "styled-components";
import theme from "../../../../Styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${theme.colors.light};
  width: 100%;
  height:100%;
`;

export const Title = styled.h1`
  color: #000;
  font-size: max(2vw, 20px);
  font-weight:bold;
`;

export const Table = styled.table`
  
`;

export const Header = styled.tr`
  font-size: max(1.2vw, 12px);

  
`;

export const THead = styled.th`

  padding: 2vw;
`;


export const Body = styled.tr`
cursor:pointer;
&:hover{
    opacity:0.7;
}

`;


export const TBody = styled.td`

    background-color: ${theme.colors.dark};
    padding:1vw;
    font-size: max(1.2vw, 12px);
    text-align:center;
   


`;