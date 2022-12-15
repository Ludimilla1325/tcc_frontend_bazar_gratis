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
  Switch,
  LabelToggle,
  InpuToggle,
  Select,
} from "./styles";
import { useCliente } from "../../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../Utils/urls";
import { Alert } from "../../../../components/Modals/Alert";
import { useGeral } from "../../../../Hooks/geral";
import { useMaster } from "../../../../Hooks/master";
export const CooperatorRegister = () => {
  const navigate = useNavigate();
  const { stores } = useGeral();
  const { createCooperator } = useMaster();
  const { register } = useCliente();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [administrator, setAdministrator] = useState(false);

  const storeList = stores.map((store) => {
    return <option value={store.id}>{store.name}</option>;
  });
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    cpf: "",
    store: 0,
    password: "",
    confirmPass: "",
  });

  const handleChangeForm = (name: string, event: any) => {
    setFormValue({
      ...formValue,
      [name]: event.target.value,
    });
  };

  return (
    <Container>
      <Title>Cadastro de Funcionário</Title>
      <Label>
        <SpanLabel>Nome</SpanLabel>
        <Input
          value={formValue.name}
          onChange={(ev) => handleChangeForm("name", ev)}
          placeholder="Digite o nome!"
        />
      </Label>
      <Label>
        <SpanLabel> Email</SpanLabel>
        <Input
          value={formValue.email}
          onChange={(ev) => handleChangeForm("email", ev)}
          placeholder="Digite o email!"
        />
      </Label>
      <Label>
        <SpanLabel>CPF</SpanLabel>
        <Input
          value={formValue.cpf}
          onChange={(ev) => handleChangeForm("cpf", ev)}
          placeholder="Digite o cpf!"
        />
      </Label>
      <Label>
        <SpanLabel>Loja</SpanLabel>
        <Select onChange={(ev) => handleChangeForm("store", ev)}>
          <option value="" hidden></option>
          {storeList}
        </Select>
      </Label>
      <Label>
        Senha
        <Input
          value={formValue.password}
          onChange={(ev) => handleChangeForm("password", ev)}
        />
      </Label>
      <Label>
        Confirmar Senha
        <Input
          value={formValue.confirmPass}
          onChange={(ev) => handleChangeForm("confirmPass", ev)}
        />
      </Label>

      <div>
        <LabelToggle>
          <span>Ativo</span>
          <InpuToggle
            checked={active}
            type="checkbox"
            onChange={(e) => setActive(e.target.checked)}
          />
          <Switch />
        </LabelToggle>
        <LabelToggle>
          <span>Administrador</span>
          <InpuToggle
            checked={administrator}
            type="checkbox"
            onChange={(e) => setAdministrator(e.target.checked)}
          />
          <Switch />
        </LabelToggle>
      </div>

      <Button
        onClick={async () => {
          try {
            setLoading(true);
            if (formValue.password === formValue.confirmPass) {
              await createCooperator(
                formValue.name,
                formValue.email,
                formValue.cpf,
                active,
                administrator,
                formValue.store,
                formValue.password
              );
            }
          } catch (error) {
            window.alert(JSON.stringify(`Erro ao cadastrar! ${error}`));
          } finally {
            setLoading(false);
          }
        }}
      >
        Confirmar
      </Button>
    </Container>
  );
};
