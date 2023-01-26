import React, { useState } from "react";
import { Container, Title, Label, Input, Button, ErrorMessage } from "./styles";
import { useNavigate } from "react-router-dom";
import { useMaster } from "../../../../Hooks/master";
import * as yup from "yup";
export const CreateAndEditStore = () => {
  const navigate = useNavigate();
  const {
    isEditedStore,
    selectedStore,
    updateStore,
    setIsEditedStore,
    createStore,
  } = useMaster();
  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    name: isEditedStore ? selectedStore.name : "",
    localization: isEditedStore ? selectedStore.description : "",
    maxPoints: isEditedStore ? selectedStore.quantity : "",
  });

  const [errors, setErrors] = useState({
    name: false,
    localization: false,
    maxPoints: false,
  });

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    localization: yup.string().required(),
    maxPoints: yup.number().required(),
  });

  const handleChangeForm = (name: string, event: any) => {
    setFormValue({
      ...formValue,
      [name]: event.target.value,
    });
  };

  return (
    <Container>
      <Title>Cadastrar loja</Title>
      <Label>
        Nome
        <Input
          value={formValue.name}
          onChange={(ev) => handleChangeForm("name", ev)}
        />
        {errors.name ? <ErrorMessage>Campo obrigatório</ErrorMessage> : ""}
      </Label>
      <Label>
        Localização
        <Input
          value={formValue.localization}
          onChange={(ev) => handleChangeForm("localization", ev)}
        />
        {errors.localization ? (
          <ErrorMessage> Campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
      </Label>
      <Label>
        Pontos Máximos
        <Input
          type="number"
          value={formValue.maxPoints}
          onChange={(ev) => handleChangeForm("maxPoints", ev)}
        />
        {errors.maxPoints ? <ErrorMessage>Campo obrigatório</ErrorMessage> : ""}
      </Label>

      {isEditedStore ? (
        <Button
          onClick={async () => {
            const isFormValid = await formSchema.isValid(formValue, {
              abortEarly: false,
            });

            if (isFormValid) {
              setLoading(true);

              await updateStore(
                selectedStore.id,
                formValue.name,
                formValue.localization,
                formValue.maxPoints
              );
              setErrors({
                name: false,
                localization: false,
                maxPoints: false,
              });
              setFormValue({
                name: "",
                localization: "",
                maxPoints: "",
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
          }}
        >
          Atualizar
        </Button>
      ) : (
        <Button
          onClick={async () => {
            const isFormValid = await formSchema.isValid(formValue, {
              abortEarly: false,
            });

            if (isFormValid) {
              setLoading(true);
              await createStore(
                formValue.name,
                formValue.localization,
                formValue.maxPoints
              );
              setErrors({
                name: false,
                localization: false,
                maxPoints: false,
              });

              setFormValue({
                name: "",
                localization: "",
                maxPoints: "",
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
          }}
        >
          Confirmar
        </Button>
      )}
    </Container>
  );
};
