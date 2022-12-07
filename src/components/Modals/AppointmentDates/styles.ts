import styled from "styled-components";
import theme from "../../../Styles/theme";


export const Container = styled.div`
    
border-radius: 0.25rem;

    display: flex;
    align-items: center;
    justify-content:space-around;
    flex-direction: column;
    background-color: ${theme.colors.dark};
padding:2vw;
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

export const Message = styled.span`
   color: ${theme.colors.fullDark}; 
   font-size:max(0.6vw +  6px);
`;

export const Label = styled.label`

font-size:max(1.2vw +  12px);
text-align:center;
cursor:pointer;
`;


export const Button = styled.button`
color: ${theme.colors.fullDark}; 

font-size:max(1vw +  10px);

margin-top:2vh;
padding:0.6vw;
border-radius: 0.25rem;
background-color: ${theme.colors.primary};
margin-bottom:1.5vh;

`;