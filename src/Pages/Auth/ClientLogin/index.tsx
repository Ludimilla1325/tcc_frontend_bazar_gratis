import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  LoginButton,
  Subtitle,
  SpanLabel,
} from "../AuthStyles";
import { useCliente } from "../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../Utils/urls";
import { Alert } from "../../../components/Modals/Alert";
export const ClientLogin = () => {
  const navigate = useNavigate();
  const { logar } = useCliente();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });

  return (
    <Container>
      {/* <Title>Login</Title>
      <Subtitle>Faça seu login para escolher os produtos</Subtitle> */}
      <Label>
        <SpanLabel> Email</SpanLabel>
        <Input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Digite seu email!"
        />
      </Label>
      <Label>
        <SpanLabel> Senha</SpanLabel>
        <Input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="Digite sua senha!"
        />
      </Label>

      <Span
        onClick={() => {
          //logar();
          navigate(`${app_base_url}/reset-pass`);
        }}
      >
        Esqueceu a Senha? Recuperar Senha
      </Span>

      <LoginButton
        onClick={async () => {
          try {
            setLoading(true);
            await logar(email, password);
            navigate(`${app_base_url}/editPass`);
          } catch (error) {
            setError({ title: "Ops", message: String(error) });
          } finally {
            setLoading(false);
          }
        }}
      >
        Logar
      </LoginButton>

     <LoginButton
        onClick={() => {
          //logar();
          navigate(`${app_base_url}/register`);
        }}
      >
        Cadastrar
      </LoginButton>

      <Alert
        open={error.message.length > 0}
        onClose={() => {
          setError({ title: "", message: "" });
        }}
        error={error}
      />
    </Container>
  );
};
