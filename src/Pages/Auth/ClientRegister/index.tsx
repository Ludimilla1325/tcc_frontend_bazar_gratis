import React, { useState } from "react";
import * as yup from "yup";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  LoginButton,
  Subtitle,
  RegisterButton,
  Select,
  ErrorMessage,
} from "./styles";
import { useCliente } from "../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../Utils/urls";
import { useGeral } from "../../../Hooks/geral";
export const ClientRegister = () => {
  const navigate = useNavigate();
  const { register } = useCliente();
  const { stores } = useGeral();
  const [loading, setLoading] = useState(false);

  const storeList = stores.map((store) => {
    return <option value={store.id}>{store.name}</option>;
  });

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cep: "",
    store: 0,
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    cpf: false,
    cep: false,
    store: false,
    password: false,
    confirmPass: false,
  });

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    cpf: yup.string().required().min(11).max(11),
    cep: yup.string().required(),
    store: yup.number().required(),
    password: yup.string().required().min(8),
    confirmPass: yup
      .string()
      .required()
      .oneOf([yup.ref("password")]),
  });

  const handleChangeForm = (name: string, event: any) => {
    setFormValue({
      ...formValue,
      [name]: event.target.value,
    });
  };

  return (
    <Container>
      <Title>Cadastrar</Title>
      <Subtitle>Crie sua conta gratuitamente</Subtitle>
      <Label>
        Nome completo
        <Input
          value={formValue.name}
          onChange={(ev) => handleChangeForm("name", ev)}
        />{" "}
        {errors.name ? (
          <ErrorMessage>Nome é um campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
      </Label>

      <Label>
        Email
        <Input
          value={formValue.email}
          onChange={(ev) => handleChangeForm("email", ev)}
        />
        {errors.email ? (
          <>
            <ErrorMessage>Campo obrigatório</ErrorMessage>
            <ErrorMessage>Digite um email válido</ErrorMessage>
          </>
        ) : (
          ""
        )}
      </Label>
      <Label>
        Telefone
        <Input
          value={formValue.phone}
          onChange={(ev) => handleChangeForm("phone", ev)}
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
        />
        {errors.cpf ? (
          <>
            <ErrorMessage>Campo obrigatório</ErrorMessage>
            <ErrorMessage>Deve ter 11 dígitos, sem pontuações</ErrorMessage>
          </>
        ) : (
          ""
        )}
      </Label>
      <Label>
        CEP
        <Input
          value={formValue.cep}
          onChange={(ev) => handleChangeForm("cep", ev)}
        />
        {errors.cep ? (
          <ErrorMessage>CEP é um campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
      </Label>
      <Label>
        Selecionar Loja
        <Select onChange={(ev) => handleChangeForm("store", ev)}>
          <option value="" hidden></option>
          {storeList}
        </Select>
        {errors.store ? (
          <ErrorMessage>Uma loja deve ser escolhida</ErrorMessage>
        ) : (
          ""
        )}
      </Label>

      <Label>
        Senha
        <Input
          value={formValue.password}
          onChange={(ev) => handleChangeForm("password", ev)}
        />
        {errors.password ? (
          <>
            <ErrorMessage>Campo obrigatório</ErrorMessage>
            <ErrorMessage>Deve ter no mínimo 8 caracteres</ErrorMessage>
          </>
        ) : (
          ""
        )}
      </Label>
      <Label>
        Confirmar Senha
        <Input
          value={formValue.confirmPass}
          onChange={(ev) => handleChangeForm("confirmPass", ev)}
        />
        {errors.confirmPass ? (
          <ErrorMessage>
            Campo obrigatório e deve corresponder ao campo senha
          </ErrorMessage>
        ) : (
          ""
        )}
      </Label>
      <RegisterButton
        onClick={async () => {
          setLoading(true);

          const isFormValid = await formSchema.isValid(formValue, {
            abortEarly: false, // Prevent aborting validation after first error
          });

          if (isFormValid) {
            if (formValue.password === formValue.confirmPass) {
              await register(
                formValue.name,
                formValue.email,
                formValue.phone,
                formValue.cpf,
                formValue.cep,
                formValue.store,
                formValue.password
              );
            }
            navigate(`${app_base_url}/home`);
            setLoading(false);
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
        Cadastrar
      </RegisterButton>
      <Span>Já possui cadastro?</Span>
      <LoginButton
        onClick={() => {
          navigate(`${app_base_url}/login`);
        }}
      >
        Login
      </LoginButton>
    </Container>
  );
};
