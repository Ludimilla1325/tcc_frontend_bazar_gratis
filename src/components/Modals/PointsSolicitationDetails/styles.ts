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


export const Header = styled.div`

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 2vw;

`;

export const SpanHeader = styled.span`

     font-size:max(0.8vw + 8px);
     font-weight:bold;
     padding: 0.5vw;

`;

export const HelperHeader = styled.div`

        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items:center;

`;

export const Body = styled.div`

    display: flex;
    flex-direction: column;
    align-items:center;
`;
export const Textarea = styled.textarea`

    min-width:60%;
    resize: none;
    background-color: ${theme.colors.dark};
    border:none;
    border-radius:0.25rem;
    margin: auto;
    font-size:max(0.8vw + 8px);
    color:${theme.colors.fullDark};
    padding:0.5vw;
    margin-top: 2vh;

`;

export const HandleButtonsDiv = styled.div`

    display:flex;
    align-items:center;
    justify-content: right;
    min-width: 60%;
`;
interface OperationButtonProps{
    focus:boolean;
}
export const OperationButton = styled.button<OperationButtonProps>`

    background-color: ${({focus})=>focus?theme.colors.primary:theme.colors.dark};
    font-size:max(0.8vw + 8px);
    color:${theme.colors.light};
    padding: 0.5vw;
    border-radius: 0.25rem;
    margin: 0.5vw;
`;