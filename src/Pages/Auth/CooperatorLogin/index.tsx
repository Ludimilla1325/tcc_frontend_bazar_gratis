import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  LoginButton,
  Subtitle,
} from "./styles";
import { useCliente } from "../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../Utils/urls";
import { useCooperator } from "../../../Hooks/cooperator";
export const CooperatorLogin = () => {
  const navigate = useNavigate();
  const { logar } = useCooperator();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Container>
      <Title>Login</Title>
      <Subtitle>Faça seu login para acessar o sistema</Subtitle>
      <Label>
        Email
        <Input value={email} onChange={(ev) => setEmail(ev.target.value)} />
      </Label>
      <Label>
        Senha
        <Input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </Label>

      <Span>Esqueceu a Senha?</Span>

      <LoginButton
        onClick={async () => {
          try {
            setLoading(true);

            await logar(email, password);
          } catch (error) {
            //MODAL Erro
          } finally {
            setLoading(false);
          }

          navigate(`${app_base_url}/cooperators`);
        }}
      >
        Logar no Sistema
      </LoginButton>
    </Container>
  );
};
