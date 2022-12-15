import styled from "styled-components";
import theme from "../../../Styles/theme";


export const Container = styled.div`
    
border-radius: 0.25rem;
background-color: ${theme.colors.light};
display: flex;
align-items: center;
justify-content:center;
flex-direction: column;
`;

export const DivX = styled.div`
    text-align: right;
   color: ${theme.colors.fullDark};
   width: 100%;
`;



export const Title = styled.h1`
    color: ${theme.colors.primary};
    font-size:max(1vw + 8px);
    margin-bottom:2vh;
`;


export const Button = styled.button`

    background-color: ${theme.colors.primary};
    font-size: max(12px,1.2vw);
    padding:0.5vw;
    border-radius: 0.25rem;

`;