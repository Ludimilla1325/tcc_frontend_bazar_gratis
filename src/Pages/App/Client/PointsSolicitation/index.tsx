import React, { useState } from "react";
import { useCliente } from "../../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../Utils/urls";
import { Alert } from "../../../../components/Modals/Alert";
import {
  Body,
  Header,
  Table,
  TableTitle,
  TBody,
  THead,
  Container,
  Title,
  Label,
  Input,
  Span,
  LoginButton,
  Subtitle,
  SpanLabel,
  InputJustification,
} from "./styles";
export const PointsSolicitation = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });

  return (
    <Container>
      <Title>Solicitar Novos pontos</Title>
      <Label>
        <SpanLabel>Nome</SpanLabel>
        <Input value={name} onChange={(ev) => setName(ev.target.value)} />
      </Label>
      <Label>
        <SpanLabel> Pontos</SpanLabel>
        <Input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Digite os pontos"
        />
      </Label>
      <Label>
        <SpanLabel>Justificativa</SpanLabel>
        <InputJustification
          value={cpf}
          onChange={(ev) => setCpf(ev.target.value)}
          placeholder="Digite uma justificativa!"
        />
      </Label>

      <LoginButton
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
        Solicitar
      </LoginButton>

      <TableTitle>Histórico de Pontos</TableTitle>
      <Table>
        <Header>
          <THead>Data</THead>
          <THead>Pontos</THead>
          <THead>Status</THead>
        </Header>

        <Body>
          <TBody>13/01/2022</TBody>
          <TBody>100</TBody>
          <TBody>ACEITO</TBody>
        </Body>
      </Table>
    </Container>
  );
};
