import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  BackButton,
  Subtitle,
  SpanLabel,
  EditButton,
} from "./styles";
import { useCliente } from "../../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../Utils/urls";
import { Alert } from "../../../../components/Modals/Alert";
import { useCooperator } from "../../../../Hooks/cooperator";
export const EditPass = () => {
  const navigate = useNavigate();
  const { updatePassword } = useCooperator();
  const [oldPass, setOldPass] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });

  return (
    <Container>
      <Title>Editar Senha</Title>
      <Label>
        <SpanLabel> Senha antiga</SpanLabel>
        <Input
          value={oldPass}
          onChange={(ev) => setOldPass(ev.target.value)}
          placeholder="Digite sua senha antiga!"
        />
      </Label>
      <Label>
        <SpanLabel> Nova Senha</SpanLabel>
        <Input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="Digite sua nova senha!"
        />
      </Label>
      <Label>
        <SpanLabel> Confirmar nova Senha</SpanLabel>
        <Input
          value={confirmPass}
          onChange={(ev) => setConfirmPass(ev.target.value)}
          placeholder="Confirme nova senha!"
        />
      </Label>

      <EditButton
        onClick={async () => {
          try {
            if (password === confirmPass) {
              await updatePassword(oldPass, password);
            }
          } catch (error) {
            setError({ title: "Ops", message: String(error) });
          } finally {
            setLoading(false);
          }
        }}
      >
        Editar Senha
      </EditButton>

      <BackButton
        onClick={async () => {
          navigate(`${app_base_url}/home`);
        }}
      >
        Voltar
      </BackButton>
    </Container>
  );
};
