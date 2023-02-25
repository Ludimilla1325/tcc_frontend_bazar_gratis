import styled from "styled-components";
import theme from "../../../../Styles/theme";

export const Container = styled.div`
 display: flex;
 align-items: center;
 justify-content:center;
 flex-direction: column;
 padding:2vw;
`;

export const Title = styled.h1`
 color: ${theme.colors.fullDark};
 font-size: max(2vw,20px);
 font-weight:bold;

`;

export const Table = styled.table`
    background-color: ${theme.colors.dark};
    border-radius:0.25rem;
    margin-top:2vh;

`;

export const Thead = styled.tr`

`;


export const Th = styled.th`
    color: ${theme.colors.secondary};
    padding:1vw;
    text-align:center;

    font-size: max(1.0vw,10px);
    
`;

export const TBody = styled.tr`


`;

export const Td = styled.td`
padding:1vw;
text-align:center;
font-size: max(1.0vw,10px);
`;