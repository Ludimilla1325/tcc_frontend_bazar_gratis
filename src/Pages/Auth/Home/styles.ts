import styled from "styled-components";
import theme from "../../../Styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 90vh;
`;

export const BodyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  height: calc(93vh - 4rem);

  @media (min-width: 500px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const HandleDiv = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2vw;
  width: 100%;
`;

export const HelperTitle = styled.div`
  margin-bottom: 2vh;
`;
export const Title = styled.h1`
  color: ${theme.colors.primary};
  font-weight: bold;
  font-size: max(2.5vw, 20px);
`;

export const FirstSpan = styled.span`
  font-weight: lighter;
  font-size: max(1vw, 12px);
  width: 100%;
  text-align:center;
`;

export const ContactHelper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2vh;
  padding: 2vw;
  margin-bottom: 2vh;
`;

export const ContactTitle = styled.span`
  color: ${theme.colors.primary};
  font-weight: bold;
  font-size: max(1.5vw, 14px);
`;
export const ContactSpan = styled.span`
  font-size: max(1vw, 12px);
`;

export const BodyFooter = styled.div`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.light};
  width: 100%;
  text-align: center;
  padding: 2vw;

  font-weight: bold;
  font-size: max(1.5vw, 14px);
`;

export const Logo = styled.img`
  max-width: 100%;
`;

export const SecondTitle = styled.h2`
  color: ${theme.colors.primary};

  font-size: max(2vw, 15px);
  text-align: center;
  padding: 4vw;

  /* background-color: blue; */
`;

export const StepDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: max(1vw, 12px);
  padding: 2vw;
`;

export const StepNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.secondary};
  font-size: max(4vw, 40px);
  color: ${theme.colors.light};
  border-radius: 100px;
  width: 100px;
  margin: 2vw;
`;

export const Body2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  @media (min-width: 500px) {
    height: 50vh;
  }
  flex-wrap: none;
/* 
  background-color: red; */
`;


export const Body3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  height:80vh;
  flex-wrap: none;
/* 
  background-color: red; */
`;
export const BodyContent2 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 70vh;

  @media (min-width: 500px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;


export const HandleColumnDiv = styled.div`

display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2vw;
  width: 100%;

`;


export const Question = styled.div`
background-color: ${theme.colors.secondary};
color:${theme.colors.light};
padding: 1vw;
font-size: max(1vw, 12px);
min-width:90%;
text-align:center;
`;

export const Answer = styled.div`

padding: 1vw;
font-size: max(1vw, 12px);
`;


interface BodyFooterSimpleProps{
  final?:boolean;
}
export const BodyFooterSimple = styled.div<BodyFooterSimpleProps>`

background-color: ${({final})=>final?theme.colors.primary:theme.colors.secondary};
  color: ${theme.colors.light};
  width: 100%;
  text-align: center;
  padding:2vw;

  font-weight: bold;
  font-size: max(1vw, 10px);

  
`;