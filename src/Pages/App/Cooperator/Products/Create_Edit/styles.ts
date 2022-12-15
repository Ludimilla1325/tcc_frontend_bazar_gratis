import styled from "styled-components";
import theme from "./../../../../../Styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
`;
export const Title = styled.h2`
  color: ${theme.colors.primary};
  font-size: max(2.5vw, 25px);
  font-weight: bold;
  margin-top: 6vh;
`;
export const Subtitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: max(1vw, 10px);
`;
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.fullDark};
  font-size: max(1.2vw, 12px);
  padding: 0.2vw;
`;
export const Input = styled.input`
  background-color: ${theme.colors.primary};
  border: none;
  border-radius: 0.25rem;
  color: ${theme.colors.light};
  font-size: max(1vw, 10px);
  padding: 0.4vw;

  min-width: 26vw;
  min-height: 2vw;
  margin-bottom: 1vh;
`;
export const Span = styled.div`
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  font-size: max(0.8vw, 8px);
`;
export const Button = styled.button`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.light};
  min-width: 20vw;
  padding: 0.6vw;
  border-radius: 0.25rem;
  margin-bottom: 2vh;
  font-size: max(1.2vw, 12px);
  margin-top: 2ch;
`;

export const BackButton = styled.button`
  background-color: ${theme.colors.blue};
  color: ${theme.colors.light};
  min-width: 20vw;
  padding: 0.6vw;
  border-radius: 0.25rem;
  margin-bottom: 2vh;
  font-size: max(1.2vw, 12px);
  margin-top: 1ch;
`;

export const SpanLabel = styled.span`
  margin-left: 0.8vw;
  padding-bottom: 0.2vh;
`;

export const Select = styled.select`
  background-color: ${theme.colors.primary};
  border: none;
  border-radius: 0.25rem;
  color: ${theme.colors.light};
  font-size: max(1vw, 10px);
  padding: 0.4vw;

  min-width: 26vw;
  min-height: 2vw;
  margin-bottom: 1vh;

  option {
    background-color: ${theme.colors.primary};
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
