import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  SpanLabel,
  EditButton,
} from "./styles";
import * as yup from "yup";
import { useCliente } from "../../../../Hooks/cliente";
export const ForgotPass = () => {
  const { sendLinkToResetPass } = useCliente();
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    email: false,
  });

  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
  });
  return (
    <Container>
      <Title>Esqueceu a Senha</Title>
      <span>
        Digite o seu email e enviaremos um email para o reset da senha
      </span>
      <Label>
        <SpanLabel>Email</SpanLabel>
        <Input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Digite seu email!"
        />
      </Label>
      <EditButton
        onClick={async () => {
          const isFormValid = await formSchema.isValid(
            { email },
            {
              abortEarly: false,
            }
          );

          if (isFormValid) {
            await sendLinkToResetPass(email);
          } else {
            formSchema
              .validate({ email }, { abortEarly: false })
              .catch((err) => {
                const errors = err.inner.reduce((acc: any, error: any) => {
                  return {
                    ...acc,
                    [error.path]: true,
                  };
                }, {});
                setErrors(errors);
              });
          }
        }}
      >
        Enviar Link para Reset
      </EditButton>
    </Container>
  );
};
