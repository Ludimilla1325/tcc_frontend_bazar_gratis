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
import { useSnackbar } from "notistack";
export const Profile = () => {
  const navigate = useNavigate();
  const { stores } = useGeral();
  const { updateProfile, clienteStore, cliente, setClienteStore } =
    useCliente();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  console.log("test", clienteStore, cliente);

  const [formValue, setFormValue] = useState({
    name: clienteStore.name,
    phone: clienteStore.phone,
    cpf: clienteStore.cpf,
    cep: clienteStore.cep,
    store: clienteStore.storeId,
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

  const { enqueueSnackbar } = useSnackbar();

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
        <>
          <RegisterButton
            onClick={async () => {
              try {
                await updateProfile(
                  formValue.name,
                  formValue.phone,
                  formValue.cep,
                  formValue.store
                );

                setClienteStore({
                  ...clienteStore,
                  name: formValue.name,
                  phone: formValue.phone,
                  cep: formValue.cep,
                  storeId: formValue.store,
                });
              } catch (error) {
                enqueueSnackbar(`Erro`, {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                });
              }
              setIsEdit(false);
            }}
          >
            Salvar
          </RegisterButton>
          <LoginButton
            onClick={async () => {
              setIsEdit(false);
            }}
          >
            Voltar
          </LoginButton>
        </>
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
