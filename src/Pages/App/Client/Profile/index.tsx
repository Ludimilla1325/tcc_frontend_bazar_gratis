import React, { useState } from "react";
import * as yup from "yup";
import {
  Container,
  Title,
  Label,
  Input,
  LoginButton,
  RegisterButton,
  Select,
  ErrorMessage,
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

  const [formValue, setFormValue] = useState({
    name: clienteStore.name,
    phone: clienteStore.phone,
    cpf: clienteStore.cpf,
    cep: clienteStore.cep,
    store: clienteStore.storeId,
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    cpf: false,
    cep: false,
    store: false,
  });

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().required(),
    cpf: yup.string().required().min(11).max(11),
    cep: yup.string().required(),
    store: yup.number().required(),
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
        {errors.name ? (
          <ErrorMessage>Nome é um campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
      </Label>
      <Label>
        Telefone
        <Input
          value={formValue.phone}
          onChange={(ev) => handleChangeForm("phone", ev)}
          disabled={!isEdit}
        />
        {errors.phone ? (
          <ErrorMessage>Telefone é um campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
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
        {errors.cep ? (
          <ErrorMessage>CEP é um campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
      </Label>
      <Label>
        Selecionar Loja
        {!isEdit ? (
          <Input value={store} disabled={!isEdit} />
        ) : (
          <>
            <Select onChange={(ev) => handleChangeForm("store", ev)}>
              <option value="" hidden>
                {store}
              </option>
              {storeList}
            </Select>
            {errors.store ? (
              <ErrorMessage>Uma loja deve ser escolhida</ErrorMessage>
            ) : (
              ""
            )}
          </>
        )}
      </Label>

      {isEdit ? (
        <>
          <RegisterButton
            onClick={async () => {
              const isFormValid = await formSchema.isValid(formValue, {
                abortEarly: false,
              });

              if (isFormValid) {
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
                setIsEdit(false);
              } else {
                formSchema
                  .validate(formValue, { abortEarly: false })
                  .catch((err) => {
                    const errors = err.inner.reduce(
                      (acc: any, error: any) => {
                        return {
                          ...acc,
                          [error.path]: true,
                        };
                      },

                      {}
                    );

                    setErrors(errors);
                  });
              }
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
