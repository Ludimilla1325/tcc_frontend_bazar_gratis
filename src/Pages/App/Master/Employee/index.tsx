import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Button,
  SpanLabel,
  Switch,
  LabelToggle,
  InpuToggle,
  Select,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useGeral } from "../../../../Hooks/geral";
import { useMaster } from "../../../../Hooks/master";
export const CooperatorRegister = () => {
  const navigate = useNavigate();
  const { stores } = useGeral();
  const {
    createCooperator,
    isEditedCooperator,
    selectedCooperator,
    updateCooperator,
    setIsEditedCooperator,
  } = useMaster();
  const [active, setActive] = useState(
    isEditedCooperator ? selectedCooperator.active : false
  );
  const [loading, setLoading] = useState(false);
  const [administrator, setAdministrator] = useState(
    isEditedCooperator ? selectedCooperator.admin : false
  );

  const storeList = stores.map((store) => {
    return <option value={store.id}>{store.name}</option>;
  });

  const [formValue, setFormValue] = useState({
    name: isEditedCooperator ? selectedCooperator.name : "",
    email: isEditedCooperator ? selectedCooperator.email : "",
    cpf: isEditedCooperator ? selectedCooperator.cpf : "",
    store: isEditedCooperator ? selectedCooperator.storeId : "",
    password: isEditedCooperator ? selectedCooperator.password : "",
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
      {isEditedCooperator ? (
        " "
      ) : (
        <>
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
        </>
      )}
      <Label>
        Selecionar Loja
        <Select onChange={(ev) => handleChangeForm("store", ev)}>
          <option value="" hidden>
            {isEditedCooperator
              ? "test"
              : // `${selectedCooperator.Store.name}, ${selectedCooperator.Store.localization}`
                //
                ""}
          </option>
          {storeList}
        </Select>
      </Label>

      {isEditedCooperator ? (
        " "
      ) : (
        <>
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
        </>
      )}
      <div>
        <LabelToggle>
          <span>Ativo</span>
          <InpuToggle
            checked={active}
            type="checkbox"
            onChange={(ev) => {
              console.log("ev", ev.target.checked);
              setActive(ev.target.checked);
            }}
          />
          <Switch />
        </LabelToggle>

        <LabelToggle>
          <span>Administrador</span>
          <InpuToggle
            checked={administrator}
            type="checkbox"
            onChange={(ev) => setAdministrator(ev.target.checked)}
          />
          <Switch />
        </LabelToggle>
      </div>

      {isEditedCooperator ? (
        <>
          <Button
            onClick={async () => {
              setLoading(true);
              await updateCooperator(
                selectedCooperator.id,
                formValue.name,
                formValue.email,
                active,
                administrator,
                formValue.store
              );
            }}
          >
            Atualizar
          </Button>

          <Button
            onClick={() => {
              setIsEditedCooperator(false);
            }}
          >
            Voltar
          </Button>
        </>
      ) : (
        <Button
          onClick={async () => {
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
            setLoading(false);
          }}
        >
          Confirmar
        </Button>
      )}
    </Container>
  );
};
