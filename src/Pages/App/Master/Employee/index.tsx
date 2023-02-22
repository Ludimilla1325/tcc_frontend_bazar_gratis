import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Button,
  SpanLabel,
  Switch,
  LabelToggle,
  InpuToggle,
  Select,
  BackButton,
  ErrorMessage,
} from "./styles";
import * as yup from "yup";
import { useGeral } from "../../../../Hooks/geral";
import { useMaster } from "../../../../Hooks/master";
import { useNavigate } from "react-router";
import { app_base_url } from "../../../../Utils/urls";
export const CooperatorRegister = () => {
  const { storeList } = useGeral();
  const {
    createCooperator,
    isEditedCooperator,
    selectedCooperator,
    updateCooperator,
    setIsEditedCooperator,
    setSelectedCooperator,
  } = useMaster();
  const [active, setActive] = useState(
    isEditedCooperator != 0 ? selectedCooperator.active : false
  );
  const [loading, setLoading] = useState(false);
  const [administrator, setAdministrator] = useState(
    isEditedCooperator != 0 ? selectedCooperator.admin : false
  );
  const navigate = useNavigate();

  const storeListReturned = storeList.map((store) => {
    return <option value={store.id}>{store.name}</option>;
  });

  const [formValue, setFormValue] = useState({
    name: isEditedCooperator != 0 ? selectedCooperator.name : "",
    email: isEditedCooperator != 0 ? selectedCooperator.email : "",
    cpf: isEditedCooperator != 0 ? selectedCooperator.cpf : "",
    store: isEditedCooperator != 0 ? selectedCooperator.storeId : "",
    password: isEditedCooperator != 0 ? selectedCooperator.password : "",
    confirmPass: "",
  });

  const store =
    isEditedCooperator != 0
      ? `${selectedCooperator.Store.name}, ${selectedCooperator.Store.localization}`
      : "";

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    cpf: false,
    store: false,
    password: false,
    confirmPass: false,
  });

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().required().min(11).max(11),
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

  useEffect(() => {}, [isEditedCooperator, selectedCooperator]);

  return (
    <Container>
      {isEditedCooperator != 0 ? (
        <Title>Atualizar Funcionário</Title>
      ) : (
        <Title>Cadastro de Funcionário</Title>
      )}

      <Label>
        <SpanLabel>Nome</SpanLabel>
        <Input
          value={formValue.name}
          onChange={(ev) => handleChangeForm("name", ev)}
          placeholder="Digite o nome!"
        />
        {errors.name ? (
          <ErrorMessage>Nome é um campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
      </Label>
      {isEditedCooperator != 0 ? (
        " "
      ) : (
        <>
          <Label>
            <SpanLabel> Email</SpanLabel>
            <Input
              value={formValue.email}
              onChange={(ev) => handleChangeForm("email", ev)}
              placeholder="Digite o email!"
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
            <SpanLabel>CPF</SpanLabel>
            <Input
              value={formValue.cpf}
              onChange={(ev) => handleChangeForm("cpf", ev)}
              placeholder="Digite o cpf!"
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
        </>
      )}
      <Label>
        Selecionar Loja
        <Select onChange={(ev) => handleChangeForm("store", ev)}>
          <option value="" hidden>
            {isEditedCooperator != 0 ? store : ""}
          </option>
          {storeListReturned}
        </Select>
        {errors.store ? (
          <ErrorMessage>Uma loja deve ser escolhida</ErrorMessage>
        ) : (
          ""
        )}
      </Label>

      {isEditedCooperator != 0 ? (
        " "
      ) : (
        <>
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
          </Label>
          {errors.confirmPass ? (
            <ErrorMessage>
              Campo obrigatório e deve corresponder ao campo senha
            </ErrorMessage>
          ) : (
            ""
          )}
        </>
      )}
      <div>
        <LabelToggle>
          <span>Ativo</span>
          <InpuToggle
            checked={active}
            type="checkbox"
            onChange={(ev) => {
              setActive(ev.target.checked);
            }}
          />
          <Switch />
        </LabelToggle>

        <LabelToggle>
          <span>Administrador</span>
          <InpuToggle
            checked={administrator}
            type="checkbox"
            onChange={(ev) => setAdministrator(ev.target.checked)}
          />
          <Switch />
        </LabelToggle>
      </div>

      {isEditedCooperator != 0 ? (
        <>
          <Button
            onClick={async () => {
              const isFormValid = await formSchema.isValid(formValue, {
                abortEarly: false, // Prevent aborting validation after first error
              });

              if (isFormValid) {
                setLoading(true);
                await updateCooperator(
                  selectedCooperator.id,
                  formValue.name,
                  formValue.email,
                  active,
                  administrator,
                  formValue.store
                );

                setIsEditedCooperator(0);
                setSelectedCooperator({});
                navigate(`${app_base_url}/colaboradores`);
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

          <BackButton
            onClick={() => {
              setIsEditedCooperator(0);
              setSelectedCooperator({});
              navigate(`${app_base_url}/colaboradores`);
            }}
          >
            Voltar
          </BackButton>
        </>
      ) : (
        <>
          <Button
            onClick={async () => {
              const isFormValid = await formSchema.isValid(formValue, {
                abortEarly: false, // Prevent aborting validation after first error
              });

              if (isFormValid) {
                setLoading(true);
                if (formValue.password === formValue.confirmPass) {
                  await createCooperator(
                    formValue.name,
                    formValue.email,
                    formValue.cpf,
                    active,
                    administrator,
                    formValue.store,
                    formValue.password
                  );
                }
                setLoading(false);
                navigate(`${app_base_url}/colaboradores`);
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

          <BackButton
            onClick={() => {
              setIsEditedCooperator(0);
              setSelectedCooperator({});
              navigate(`${app_base_url}/colaboradores`);
            }}
          >
            Voltar
          </BackButton>
        </>
      )}
    </Container>
  );
};
