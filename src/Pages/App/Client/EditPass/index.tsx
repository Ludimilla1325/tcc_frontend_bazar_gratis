import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  BackButton,
  SpanLabel,
  EditButton,
  ErrorMessage,
} from "./styles";
import * as yup from "yup";
import { useCliente } from "../../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../Utils/urls";
export const EditPass = () => {
  const navigate = useNavigate();
  const { updatePassword } = useCliente();
  const [oldPass, setOldPass] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [errors, setErrors] = useState({
    password: false,
    confirmPass: false,
  });

  const formSchema = yup.object().shape({
    password: yup.string().required().min(8),
    confirmPass: yup
      .string()
      .required()
      .oneOf([yup.ref("password")]),
  });

  return (
    <Container>
      <Title>Editar Senha</Title>
      <Label>
        <SpanLabel> Senha antiga</SpanLabel>
        <Input
          value={oldPass}
          onChange={(ev) => setOldPass(ev.target.value)}
          placeholder="Digite sua senha antiga!"
        />
      </Label>
      <Label>
        <SpanLabel> Nova Senha</SpanLabel>
        <Input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="Digite sua nova senha!"
        />
        {errors.password ? (
          <>
            <ErrorMessage>Senha é um campo obrigatório</ErrorMessage>
            <ErrorMessage>Mínimo de 8 caracteres</ErrorMessage>
          </>
        ) : (
          ""
        )}
      </Label>
      <Label>
        <SpanLabel> Confirmar nova Senha</SpanLabel>
        <Input
          value={confirmPass}
          onChange={(ev) => setConfirmPass(ev.target.value)}
          placeholder="Confirme nova senha!"
        />
        {errors.confirmPass ? (
          <>
            <ErrorMessage>Campo obrigatório</ErrorMessage>
            <ErrorMessage>Corresponder ao campo senha</ErrorMessage>
          </>
        ) : (
          ""
        )}
      </Label>

      <EditButton
        onClick={async () => {
          const isFormValid = await formSchema.isValid(
            { password, confirmPass },
            {
              abortEarly: false,
            }
          );

          if (isFormValid) {
            if (password === confirmPass) {
              await updatePassword(oldPass, password);
            }

            navigate(`${app_base_url}/profile`);
          } else {
            formSchema
              .validate({ password, confirmPass }, { abortEarly: false })
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
        Editar Senha
      </EditButton>

      <BackButton
        onClick={async () => {
          navigate(`${app_base_url}/profile`);
        }}
      >
        Voltar
      </BackButton>
    </Container>
  );
};
