import styled from "styled-components";
import theme from "../../../Styles/theme";

export const Container = styled.div`
  border-radius: 0.25rem;
  background-color: ${theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const DivX = styled.div`
  text-align: right;
  width: 100%;
  color: ${theme.colors.fullDark};
`;

export const Title = styled.h1`
  color: ${theme.colors.primary};
  font-size: max(1.5vw , 15px);
  font-weight: bold;
  margin-bottom: 2vh;
`;

export const ContainerData = styled.div`
display: flex;
align-items: flex-start;
justify-content:center;
flex-direction: column;

`;
export const Label = styled.label`
  font-size: max(1.2vw , 12px);
  margin-left:0.5vw;
`;
export const DataSpan = styled.span`
    width:100%;
    background-color: ${theme.colors.darkGrey};
    padding:1vw;
    border-radius: 0.25rem;
    font-size: max(1.2vw , 12px);

`;
export const HandlerContainerData = styled.div`

    display: flex;
    width: 100%;
    align-items: center;
    justify-content:space-around;
    margin-top:2vh;
`;


export const IconsDiv = styled.div`

  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 1vw;

`;