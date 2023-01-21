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
import { useCooperator } from "../../../../Hooks/cooperator";
import { useSnackbar } from "notistack";
export const Profile = () => {
  const navigate = useNavigate();
  const { stores } = useGeral();
  const { updateProfile, cooperator, setCooperator } = useCooperator();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [formValue, setFormValue] = useState({
    name: cooperator.name,
    cpf: cooperator.cpf,
    store: cooperator.storeId,
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
        CPF
        <Input
          value={formValue.cpf}
          onChange={(ev) => handleChangeForm("cpf", ev)}
          disabled={true}
        />
      </Label>

      {isEdit ? (
        <>
          <RegisterButton
            onClick={async () => {
              try {
                await updateProfile(formValue.name);
              } catch (error) {
                enqueueSnackbar(`Erro`, {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                });
              }
              setIsEdit(true);
              setCooperator({ ...cooperator, name: formValue.name });
              setIsEdit(false);
            }}
          >
            Salvar
          </RegisterButton>
          <LoginButton
            onClick={() => {
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
