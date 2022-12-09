import styled from "styled-components";
import theme from "./../../../../Styles/theme";

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

export const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 28px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

export const InpuToggle = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: green;

    &:before {
      transform: translate(32px, -50%);
    }
  }
`;

export const LabelToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
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
