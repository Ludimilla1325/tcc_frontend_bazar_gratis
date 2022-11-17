import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  LoginButton,
  Subtitle,
} from "./styles";
import { useCliente } from "../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../Utils/urls";
export const ClientRegister = () => {
  const navigate = useNavigate();
  const { register } = useCliente();
  const [loading, setLoading] = useState(false);

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

  const handleChangeForm = (event: any) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <Title>Cadastrar</Title>
      <Subtitle>Crie sua conta gratuitamente</Subtitle>
      <Label>
        Nome completo
        <Input value={formValue.name} onChange={handleChangeForm} />
      </Label>
      <Label>
        Email
        <Input value={formValue.email} onChange={handleChangeForm} />
      </Label>
      <Label>
        Telefone
        <Input value={formValue.phone} onChange={handleChangeForm} />
      </Label>
      <Label>
        CPF
        <Input value={formValue.cpf} onChange={handleChangeForm} />
      </Label>
      <Label>
        CEP
        <Input value={formValue.cep} onChange={handleChangeForm} />
      </Label>
      <Label>
        Selecionar Loja
        <Input value={formValue.store} onChange={handleChangeForm} />
      </Label>

      <Label>
        Senha
        <Input value={formValue.password} onChange={handleChangeForm} />
      </Label>
      <Label>
        Confirmar Senha
        <Input value={formValue.confirmPass} onChange={handleChangeForm} />
      </Label>
      <LoginButton
        onClick={async () => {
          try {
            setLoading(true);

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
      </LoginButton>
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
