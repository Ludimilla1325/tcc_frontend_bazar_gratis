import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  LoginButton,
  RegisterButton,
  ErrorMessage,
} from "./styles";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../Utils/urls";
import { useCooperator } from "../../../../Hooks/cooperator";
export const Profile = () => {
  const navigate = useNavigate();
  const { updateProfile, cooperator, setCooperator } = useCooperator();
  const [isEdit, setIsEdit] = useState(false);

  const [formValue, setFormValue] = useState({
    name: cooperator.name,
    cpf: cooperator.cpf,
    store: cooperator.storeId,
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({
    name: false,
  });

  const formSchema = yup.object().shape({
    name: yup.string().required(),
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
        {errors.name ? (
          <ErrorMessage>Nome é um campo obrigatório</ErrorMessage>
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

      {isEdit ? (
        <>
          <RegisterButton
            onClick={async () => {
              const isFormValid = await formSchema.isValid(formValue, {
                abortEarly: false,
              });
              if (isFormValid) {
                await updateProfile(formValue.name);
                setIsEdit(true);
                setCooperator({ ...cooperator, name: formValue.name });
                setIsEdit(false);
                setErrors({
                  name: false,
                });
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
              // try {
              //   await updateProfile(formValue.name);
              // } catch (error) {
              //   enqueueSnackbar(`Erro`, {
              //     variant: "error",
              //     anchorOrigin: {
              //       vertical: "top",
              //       horizontal: "right",
              //     },
              //   });
              // }
              // setIsEdit(true);
              // setCooperator({ ...cooperator, name: formValue.name });
              // setIsEdit(false);
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
