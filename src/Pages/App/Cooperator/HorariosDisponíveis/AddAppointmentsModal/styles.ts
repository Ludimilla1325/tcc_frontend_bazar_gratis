import styled from "styled-components";
import theme from "../../../../../Styles/theme";



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
`;



export const Label = styled.label`
    color: ${theme.colors.primary};
    font-size:max(1vw + 18px);
    margin-bottom:2vh;
    display:flex;
    flex-direction: column;
`;

export const Message = styled.span`
   color: ${theme.colors.fullDark}; 
   font-size:max(0.6vw +  6px);
`;

export const ButtonsDiv = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-around;
 width: 100%;

`; 
export const Button = styled.button`
padding:1vw;
font-size:max(1vw, 10px);
`;