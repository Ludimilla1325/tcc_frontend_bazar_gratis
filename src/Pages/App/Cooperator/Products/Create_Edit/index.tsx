import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Button,
  Select,
  ErrorMessage,
  BackButton,
} from "./styles";
import { useCooperator } from "../../../../../Hooks/cooperator";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { app_base_url } from "../../../../../Utils/urls";
export const CreateAndEditProduct = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState({} as any);
  const [fileTeste, setFileTeste] = useState("");
  const {
    createProduct,
    categories,
    updateProduct,
    productSelected,
    isEditProduct,
    setIsEditProduct,
    setProductSelected,
  } = useCooperator();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //sem tipagem fica ruim de acessar
    //setFileTeste(productSelected.photo);
  }, [productSelected]);
  const [formValue, setFormValue] = useState({
    product: isEditProduct != 0 ? productSelected.name : "",
    description: isEditProduct != 0 ? productSelected.description : "",
    category: isEditProduct != 0 ? productSelected.categoryId : "",
    quantity: isEditProduct != 0 ? productSelected.quantity : "",
    unityValue: isEditProduct != 0 ? productSelected.value : "",
    image: isEditProduct != 0 ? productSelected.photo : "",
  });

  const [errors, setErrors] = useState({
    product: false,
    description: false,
    category: false,
    quantity: false,
    unityValue: false,
    image: false,
  });

  const formSchema = yup.object().shape({
    product: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    quantity: yup.number().required(),
    unityValue: yup.number().required(),
    image: productSelected.id ? yup.string() : yup.string().required(),
  });
  const categoryList = categories.map((category) => {
    return <option value={category.id}>{category.name}</option>;
  });

  const handleChangeForm = (name: string, event: any) => {
    setFormValue({
      ...formValue,
      [name]: event.target.value,
    });
  };

  useEffect(() => {}, [productSelected]);

  return (
    <Container>
      {isEditProduct != 0 ? (
        <Title>Atualizar produto</Title>
      ) : (
        <Title>Cadastrar produto</Title>
      )}
      <Label>
        Produto
        <Input
          value={formValue.product}
          onChange={(ev) => handleChangeForm("product", ev)}
        />
        {errors.product ? <ErrorMessage>Campo obrigatório</ErrorMessage> : ""}
      </Label>
      <Label>
        Descrição
        <Input
          value={formValue.description}
          onChange={(ev) => handleChangeForm("description", ev)}
        />
        {errors.description ? (
          <ErrorMessage>Campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
      </Label>
      <Label>
        Categoria
        {isEditProduct != 0 ? (
          <>
            <Select onChange={(ev) => handleChangeForm("category", ev)}>
              <option value="" hidden>
                test
              </option>
              {categoryList}
            </Select>
            {errors.product ? (
              <ErrorMessage>Campo obrigatório</ErrorMessage>
            ) : (
              ""
            )}
          </>
        ) : (
          <Select onChange={(ev) => handleChangeForm("category", ev)}>
            <option value="" hidden></option>
            {categoryList}
          </Select>
        )}
      </Label>
      <Label>
        Quantidade
        <Input
          type="number"
          value={formValue.quantity}
          onChange={(ev) => handleChangeForm("quantity", ev)}
        />
        {errors.quantity ? <ErrorMessage>Campo obrigatório</ErrorMessage> : ""}
      </Label>
      <Label>
        Valor unitário
        <Input
          type="number"
          value={formValue.unityValue}
          onChange={(ev) => handleChangeForm("unityValue", ev)}
        />
        {errors.unityValue ? (
          <ErrorMessage>Campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
      </Label>
      <Label>
        Imagem
        <Input
          value={fileTeste}
          onChange={(ev) => {
            if (ev.target.files) {
              if (ev.target.files[0] && ev.target.files[0].size) {
                setFile(ev.target.files[0]);
              } else {
                setFile(null);
              }
            }
if(ev.target.value){
  handleChangeForm("image", ev); //verificar se foi preenchido
  setFileTeste(ev.target.value);
}
            
          }}
          type={"file"}
        />
        {errors.image ? <ErrorMessage>Campo obrigatório</ErrorMessage> : ""}
      </Label>

      {isEditProduct != 0 ? (
        <>
          <Button
            onClick={async () => {
              const isFormValid = await formSchema.isValid(formValue, {
                abortEarly: false,
              });

              if (isFormValid) {
                setLoading(true);

                await updateProduct(
                  productSelected.id,
                  formValue.product,
                  formValue.description,
                  formValue.category,
                  formValue.quantity,
                  formValue.unityValue,
                  file
                );

                setIsEditProduct(0);

                setFormValue({
                  product: "",
                  description: "",
                  category: "",
                  quantity: "",
                  unityValue: "",
                  image: "",
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

          <BackButton
            onClick={async () => {
              setProductSelected({});
              setIsEditProduct(0);
              navigate(`${app_base_url}/produtos`);
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
                abortEarly: false,
              });

              if (isFormValid) {
                setLoading(true);
                await createProduct(
                  formValue.product,
                  formValue.description,
                  formValue.category,
                  formValue.quantity,
                  formValue.unityValue,
                  file
                );

                setLoading(false);
              } else {
                formSchema
                  .validate(formValue, { abortEarly: false })
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
            Confirmar
          </Button>
        </>
      )}
    </Container>
  );
};
