import React, { useEffect, useState } from "react";
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
  BackButton,
} from "./styles";
import { useGeral } from "../../../../Hooks/geral";
import { useMaster } from "../../../../Hooks/master";
import { useNavigate } from "react-router";
import { app_base_url } from "../../../../Utils/urls";
export const CooperatorRegister = () => {
  const { stores } = useGeral();
  const {
    createCooperator,
    isEditedCooperator,
    selectedCooperator,
    updateCooperator,
    setIsEditedCooperator,
    setSelectedCooperator,
  } = useMaster();
  const [active, setActive] = useState(
    isEditedCooperator != 0 ? selectedCooperator.active : false
  );
  const [loading, setLoading] = useState(false);
  const [administrator, setAdministrator] = useState(
    isEditedCooperator != 0 ? selectedCooperator.admin : false
  );
  const navigate = useNavigate();
  const storeList = stores.map((store) => {
    return <option value={store.id}>{store.name}</option>;
  });

  const [formValue, setFormValue] = useState({
    name: isEditedCooperator != 0 ? selectedCooperator.name : "",
    email: isEditedCooperator != 0 ? selectedCooperator.email : "",
    cpf: isEditedCooperator != 0 ? selectedCooperator.cpf : "",
    store: isEditedCooperator != 0 ? selectedCooperator.storeId : "",
    password: isEditedCooperator != 0 ? selectedCooperator.password : "",
    confirmPass: "",
  });

  const handleChangeForm = (name: string, event: any) => {
    setFormValue({
      ...formValue,
      [name]: event.target.value,
    });
  };

  useEffect(() => {}, [isEditedCooperator, selectedCooperator]);

  console.log(isEditedCooperator, selectedCooperator);

  return (
    <Container>
      {selectedCooperator != 0 ? (
        <Title>Atualizar Funcionário</Title>
      ) : (
        <Title>Cadastro de Funcionário</Title>
      )}

      <Label>
        <SpanLabel>Nome</SpanLabel>
        <Input
          value={formValue.name}
          onChange={(ev) => handleChangeForm("name", ev)}
          placeholder="Digite o nome!"
        />
      </Label>
      {isEditedCooperator != 0 ? (
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
            {isEditedCooperator != 0
              ? "test"
              : // `${selectedCooperator.Store.name}, ${selectedCooperator.Store.localization}`
                //
                ""}
          </option>
          {storeList}
        </Select>
      </Label>

      {isEditedCooperator != 0 ? (
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

      {isEditedCooperator != 0 ? (
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

          <BackButton
            onClick={() => {
              setIsEditedCooperator(0);
              setSelectedCooperator({});
              navigate(`${app_base_url}/colaboradores`);
            }}
          >
            Voltar
          </BackButton>
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
