import styled from "styled-components";
import theme from "../../../../Styles/theme";

export const TableTitle = styled.h4`
  color: deeppink;
  font-size: max(2vw, 20px);
  font-weight: bold;
  margin-top: 2cm;
`;

export const Table = styled.table``;

export const Header = styled.tr`
  font-size: max(1.2vw, 12px);
  color: ${theme.colors.primary};
`;

export const THead = styled.th`
  padding: 1vw;
`;

export const Body = styled.tr`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const TBody = styled.td`
  background-color: ${theme.colors.dark};
  padding: 1vw;
  font-size: max(1.2vw, 12px);
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
export const Title = styled.h1`
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
  font-size: max(1vw, 14px);
  padding: max(0.4vw,15px);

  min-width: max(30vw,300px);
  min-height: 2vw;
  margin-bottom: 1vh;
`;

export const InputJustification = styled.input`
  /* background-color: ${theme.colors.primary};
  border: none;
  border-radius: 0.25rem;
  color: ${theme.colors.light};
  font-size: max(1vw, 14px);
  min-width: max(30vw,300px);
  padding: 0.4vw;

  min-width: 30vw;
  min-height: 10vw;
  margin-bottom: 1vh; */

  background-color: ${theme.colors.primary};
  border: none;
  border-radius: 0.25rem;
  color: ${theme.colors.light};
  font-size: max(1vw, 14px);
  padding: max(0.4vw,15px);

  min-width: max(30vw,300px);
  min-height: 2vw;
  margin-bottom: 1vh;
`;
export const Span = styled.div`
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: right;
  width: 15%;
  font-size: max(0.8vw, 8px);
`;
export const LoginButton = styled.button`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.light};
  min-width: 20vw;
  padding: max(0.6vw,10px);
  border-radius: 0.25rem;
  margin-bottom: 2vh;
  font-size: max(1.2vw, 14px);
  margin-top: 5vh;
`;

export const SpanLabel = styled.span`
  margin-left: 0.8vw;
  padding-bottom: 0.2vh;
`;

export const ErrorMessage = styled.span`
  color: #d8000c;
  background-color: #ffbaba;
`;
