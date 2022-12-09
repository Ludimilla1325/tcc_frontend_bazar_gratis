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
  const { pointsSolicitationList, cliente, clienteStore, pointsSolicitation } =
    useCliente();
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [justification, setJustification] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });

  function renderData() {
    if (pointsSolicitationList && pointsSolicitationList.length > 0) {
      return pointsSolicitationList.map((item: any) => {
        return (
          <Body>
            <TBody>{item.request_date}</TBody>
            <TBody>{item.quantity}</TBody>
            <TBody>{item.status}</TBody>
          </Body>
        );
      });
    }
  }

  return (
    <Container>
      <Title>Solicitar Novos pontos</Title>
      <Label>
        <SpanLabel>Nome</SpanLabel>
        <Input value={clienteStore.name} disabled={true} />
      </Label>
      <Label>
        <SpanLabel> Pontos</SpanLabel>
        <Input
          type="number"
          value={quantity}
          onChange={(ev) => setQuantity(ev.target.value)}
          placeholder="Digite os pontos"
        />
      </Label>
      <Label>
        <SpanLabel>Justificativa</SpanLabel>
        <InputJustification
          value={justification}
          onChange={(ev) => setJustification(ev.target.value)}
          placeholder="Digite uma justificativa!"
        />
      </Label>

      <LoginButton
        onClick={async () => {
          try {
            setLoading(true);
            await pointsSolicitation(quantity, justification);
          } catch (error) {
            setError({ title: "Ops", message: String(error) });
          } finally {
            setLoading(false);
          }
        }}
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

        {renderData()}
      </Table>
    </Container>
  );
};
