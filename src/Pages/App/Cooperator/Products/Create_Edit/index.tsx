import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  Button,
  Subtitle,
  SpanLabel,
  Select,
} from "./styles";
import { useCliente } from "../../../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../../Utils/urls";
import { useCooperator } from "../../../../../Hooks/cooperator";
import { useSnackbar } from "notistack";
export const CreateAndEditProduct = () => {
  const navigate = useNavigate();
  const {
    createProduct,
    categories,
    updateProduct,
    productSelected,
    isEditProduct,
    setIsEditProduct,
  } = useCooperator();
  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    product: isEditProduct != 0 ? productSelected.name : "",
    description: isEditProduct != 0 ? productSelected.description : "",
    category: isEditProduct != 0 ? productSelected.categoryId : "",
    // categoryName: isEditProduct ? productSelected.Category.name : "",
    quantity: isEditProduct != 0 ? productSelected.quantity : "",
    unityValue: isEditProduct != 0 ? productSelected.value : "",
    image: isEditProduct != 0 ? productSelected.photo : "",
  });

  const { enqueueSnackbar } = useSnackbar();
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
      <Title>Cadastrar produto</Title>
      <Label>
        Produto
        <Input
          value={formValue.product}
          onChange={(ev) => handleChangeForm("product", ev)}
        />
      </Label>
      <Label>
        Descrição
        <Input
          value={formValue.description}
          onChange={(ev) => handleChangeForm("description", ev)}
        />
      </Label>
      <Label>
        Categoria
        {isEditProduct != 0 ? (
          <Select onChange={(ev) => handleChangeForm("category", ev)}>
            <option value="" hidden>
              test
            </option>
            {categoryList}
          </Select>
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
      </Label>
      <Label>
        Valor unitário
        <Input
          type="number"
          value={formValue.unityValue}
          onChange={(ev) => handleChangeForm("unityValue", ev)}
        />
      </Label>
      <Label>
        Imagem
        <Input
          value={formValue.image}
          onChange={(ev) => handleChangeForm("image", ev)}
        />
      </Label>

      {isEditProduct != 0 ? (
        <Button
          onClick={async () => {
            try {
              setLoading(true);

              await updateProduct(
                productSelected.id,
                formValue.product,
                formValue.description,
                formValue.category,
                formValue.quantity,
                formValue.unityValue,
                formValue.image
              );

              setIsEditProduct(0);
            } catch (error) {
              enqueueSnackbar("Erro ao cadastrar!", {
                variant: "error",
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
              });
            } finally {
              setLoading(false);
            }
          }}
        >
          Atualizar
        </Button>
      ) : (
        <Button
          onClick={async () => {
            try {
              setLoading(true);
              await createProduct(
                formValue.product,
                formValue.description,
                formValue.category,
                formValue.quantity,
                formValue.unityValue,
                formValue.image
              );
            } catch (error) {
              enqueueSnackbar("Erro ao cadastrar!", {
                variant: "error",
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
              });
            } finally {
              setLoading(false);
            }
          }}
        >
          Confirmar
        </Button>
      )}
    </Container>
  );
};
