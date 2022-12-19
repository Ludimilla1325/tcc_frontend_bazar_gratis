import React, { useState } from "react";
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
export const CreateAndEditProduct = () => {
  const navigate = useNavigate();
  const { categories } = useCooperator();
  const { createProduct } = useCooperator();
  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    product: "",
    description: "",
    category: "",
    quantity: "",
    unityValue: "",
    image: "",
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
        <Select onChange={(ev) => handleChangeForm("category", ev)}>
          <option value="" hidden></option>
          {categoryList}
        </Select>
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
            window.alert(JSON.stringify("Erro ao cadastrar!"));
          } finally {
            setLoading(false);
          }
        }}
      >
        Confirmar
      </Button>
    </Container>
  );
};
