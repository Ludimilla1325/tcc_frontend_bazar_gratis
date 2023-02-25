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
import { useCooperator } from "../../../Hooks/cooperator";
import { Alert } from "../../../components/Modals/Alert";
export const CooperatorLogin = () => {
  const navigate = useNavigate();
  const { logar } = useCooperator();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });
  return (
    <Container>
      <Title>Login</Title>
      <Subtitle>Faça seu login para acessar o sistema</Subtitle>
      <Label>
        <SpanLabel> Email</SpanLabel>
        <Input value={email} onChange={(ev) => setEmail(ev.target.value)} />
      </Label>
      <Label>
        <SpanLabel> Senha</SpanLabel>
        <Input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type={"password"}
        />
      </Label>

      <LoginButton
        onClick={async () => {
          try {
            setLoading(true);

            await logar(email, password);
            navigate(`${app_base_url}/dashboard`);
          } catch (error) {
            setError({ title: "Ops", message: String(error) });
          } finally {
            setLoading(false);
          }
        }}
      >
        Logar no Sistema
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
