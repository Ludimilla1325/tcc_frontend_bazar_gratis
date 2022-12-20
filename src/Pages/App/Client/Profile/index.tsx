import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  LoginButton,
  Subtitle,
  SpanLabel,
  RegisterButton,
  Select,
} from "./styles";
import { useCliente } from "../../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../Utils/urls";
import { useGeral } from "../../../../Hooks/geral";
export const Profile = () => {
  const navigate = useNavigate();
  const { stores } = useGeral();
  const { updateProfile, clienteStore } = useCliente();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formValue, setFormValue] = useState({
    name: clienteStore.name,
    phone: clienteStore.phone,
    cpf: clienteStore.cpf,
    cep: clienteStore.cep,
    store: 0,
    password: "",
    confirmPass: "",
  });

  const storeList = stores.map((store) => {
    return <option value={store.id}>{store.name}</option>;
  });

  const handleChangeForm = (name: string, event: any) => {
    setFormValue({
      ...formValue,
      [name]: event.target.value,
    });
  };

  const store = `${clienteStore.Store.name}, ${clienteStore.Store.localization}`;

  return (
    <Container>
      <Title>Perfil</Title>
      <Label>
        Nome completo
        <Input
          value={formValue.name}
          onChange={(ev) => handleChangeForm("name", ev)}
          disabled={!isEdit}
        />
      </Label>
      <Label>
        Telefone
        <Input
          value={formValue.phone}
          onChange={(ev) => handleChangeForm("phone", ev)}
          disabled={!isEdit}
        />
      </Label>
      <Label>
        CPF
        <Input
          value={formValue.cpf}
          onChange={(ev) => handleChangeForm("cpf", ev)}
          disabled={true}
        />
      </Label>
      <Label>
        CEP
        <Input
          value={formValue.cep}
          onChange={(ev) => handleChangeForm("cep", ev)}
          disabled={!isEdit}
        />
      </Label>
      <Label>
        Selecionar Loja
        {!isEdit ? (
          <Input value={store} disabled={!isEdit} />
        ) : (
          <Select onChange={(ev) => handleChangeForm("store", ev)}>
            <option value="" hidden>
              {store}
            </option>
            {storeList}
          </Select>
        )}
      </Label>

      {isEdit ? (
        <RegisterButton
          onClick={async () => {
            try {
              await updateProfile(
                formValue.name,
                formValue.phone,
                formValue.cep,
                formValue.store
              );
            } catch (error) {
              window.alert(error);
            }
            setIsEdit(true);
          }}
        >
          Salvar
        </RegisterButton>
      ) : (
        <>
          <RegisterButton onClick={() => setIsEdit(true)}>
            Editar Dados
          </RegisterButton>
          <LoginButton
            onClick={() => {
              navigate(`${app_base_url}/editPass`);
            }}
          >
            Editar Senha
          </LoginButton>
        </>
      )}
    </Container>
  );
};
