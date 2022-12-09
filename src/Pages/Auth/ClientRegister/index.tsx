import React, { useState } from "react";
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
        />
      </Label>
      <Label>
        Email
        <Input
          value={formValue.email}
          onChange={(ev) => handleChangeForm("email", ev)}
        />
      </Label>
      <Label>
        Telefone
        <Input
          value={formValue.phone}
          onChange={(ev) => handleChangeForm("phone", ev)}
        />
      </Label>
      <Label>
        CPF
        <Input
          value={formValue.cpf}
          onChange={(ev) => handleChangeForm("cpf", ev)}
        />
      </Label>
      <Label>
        CEP
        <Input
          value={formValue.cep}
          onChange={(ev) => handleChangeForm("cep", ev)}
        />
      </Label>
      <Label>
        Selecionar Loja
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
      <RegisterButton
        onClick={async () => {
          try {
            setLoading(true);
            console.log("formValue", formValue);

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
          } catch (error) {
            window.alert(JSON.stringify("Erro ao cadastrar!"));
          } finally {
            setLoading(false);
          }
        }}
      >
        Cadastrar
      </RegisterButton>
      <Span>Já possui cadastro?</Span>
      <LoginButton
        onClick={() => {
          //   logar();
          navigate(`${app_base_url}/login`);
        }}
      >
        Login
      </LoginButton>
    </Container>
  );
};
