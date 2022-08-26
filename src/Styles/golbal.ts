import { createGlobalStyle } from "styled-components";
import theme from "./theme";

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,300&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body, input, button{
    font: 14px Poppis, sans-serif;
    background-color: ${theme.colors.dark};
  }
  button {
    cursor: pointer;
    border:0;
  }
  
  a{
    text-decoration: none;
    color:black;
  }
`;