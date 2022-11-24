import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  Button,
  Subtitle,
  SpanLabel,
} from "./styles";
import { useCliente } from "../../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../Utils/urls";
import { Alert } from "../../../../components/Modals/Alert";
export const CooperatorRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });

  return (
    <Container>
      <Title>Cadastro de Funcionário</Title>
      <Label>
        <SpanLabel>Nome</SpanLabel>
        <Input
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Digite o nome!"
        />
      </Label>
      <Label>
        <SpanLabel> Email</SpanLabel>
        <Input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Digite o email!"
        />
      </Label>
      <Label>
        <SpanLabel>CPF</SpanLabel>
        <Input
          value={cpf}
          onChange={(ev) => setCpf(ev.target.value)}
          placeholder="Digite o cpf!"
        />
      </Label>

      <Button
      // onClick={async () => {
      //   try {
      //     setLoading(true);
      //     await logar(email, password);
      //     navigate(`${app_base_url}/editPass`);
      //   } catch (error) {
      //     setError({ title: "Ops", message: String(error) });
      //   } finally {
      //     setLoading(false);
      //   }
      // }}
      >
        Confirmar
      </Button>
    </Container>
  );
};
