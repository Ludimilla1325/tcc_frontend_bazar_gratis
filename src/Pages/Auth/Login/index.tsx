import React from "react";
import { Container, LoginButton, Title } from "./styles";
import { useCliente } from "../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../Utils/urls";
export const Login = () => {
  const navigate = useNavigate();
  const { logar } = useCliente();
  return (
    <Container>
      <Title>Login</Title>
      <LoginButton
        onClick={() => {
          logar();
          navigate(`${app_base_url}/home`);
        }}
      >
        Logar
      </LoginButton>
    </Container>
  );
};
