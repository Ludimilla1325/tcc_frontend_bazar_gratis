import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  SpanLabel,
  EditButton,
} from "./styles";
import { useCliente } from "../../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../Utils/urls";
import { Alert } from "../../../../components/Modals/Alert";
export const ForgotPass = () => {
  const navigate = useNavigate();
  const { sendLinkToResetPass } = useCliente();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });

  return (
    <Container>
      <Title>Esqueceu a Senha</Title>
      <span>
        Digite o seu email e enviaremos um email para o reset da senha
      </span>
      <Label>
        <SpanLabel>Email</SpanLabel>
        <Input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Digite seu email!"
        />
      </Label>
      <EditButton
        onClick={async () => {
          try {
            await sendLinkToResetPass(email);
          } catch (error) {
            setError({ title: "Ops", message: String(error) });
          } finally {
            setLoading(false);
          }
        }}
      >
        Enviar Link para Reset
      </EditButton>
    </Container>
  );
};
