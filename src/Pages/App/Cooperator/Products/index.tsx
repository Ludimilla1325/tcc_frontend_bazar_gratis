import React, { useEffect, useState } from "react";
import { useCooperator } from "../../../../Hooks/cooperator";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../../Utils/urls";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  Category,
  ProductContainer,
  CategoryContainer,
  FooterSpan,
  ProductImage,
  ProdutctFooter,
  ProductSpan,
  PlusButton,
  Body,
  Wrapper,
} from "./styles";
import api from "../../../../Services/api";
import { FiPlus } from "react-icons/fi";
import { useSnackbar } from "notistack";
export interface IProduct {
  id: number;
  name: string;
  photo: string;
  categoryId: number;
  value: number;
  quantity: number;
  storeId: number;
  categoria: string;
  description: string;
}

export const Products = () => {
  const [products, setProducts] = useState({} as IProduct[]);
  const [categories, setCategories] = useState([] as Array<string>);
  const navigate = useNavigate();
  const {
    cooperator,
    getProduct,
    productSelected,
    isEditProduct,
    setIsEditProduct,
    setProductSelected,
  } = useCooperator();
  const { storeId } = useParams();
  useEffect(() => {
    handleData();
    setProductSelected({});
    setIsEditProduct(0);
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  async function handleData() {
    try {
      const { data } = await api.get(
        `/product/${storeId ? storeId : cooperator.storeId}`
      );
      if (data.sucess) {
        setProducts(data.data);
      } else {
        enqueueSnackbar(`${data.message}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (products && products.length > 0) {
      let helper = "";
      for (let index = 0; index < products.length; index++) {
        const item = products[index];

        if (categories.length == 0) {
          helper = item.categoria;
          setCategories([item.categoria]);
        } else {
          if (helper != item.categoria) {
            helper = item.categoria;
            setCategories((prev) => [...prev, item.categoria]);
          }
        }
      }
    }
  }, [products]);

  useEffect(() => {
    getProduct(isEditProduct);
  }, [isEditProduct]);

  useEffect(() => {
    if (productSelected && productSelected.id) {
      navigate(`${app_base_url}/create-products`);
    }
  }, [productSelected]);

  function renderProducts(category: string) {
    const list = products.filter((item) => item.categoria == category);
    if (list && list.length > 0) {
      return list.map((item) => {
        return (
          <ProductContainer
            //onClick={() => console.log("test")}
            onClick={() => {
              setIsEditProduct(item.id);

              // getProduct(item.id);
            }}
          >
            <ProductImage src={item.photo} />
            <ProductSpan>{item.name}</ProductSpan>

            <ProductSpan>{item.description}</ProductSpan>
            <ProdutctFooter>
              <FooterSpan>Quantidade: {item.quantity}</FooterSpan>
              <FooterSpan>Valor: {item.value}</FooterSpan>
            </ProdutctFooter>
          </ProductContainer>
        );
      });
    }
  }

  function renderCategory() {
    if (categories && categories.length > 2) {
      return categories.map((item) => {
        return (
          <>
            <Category>{item}</Category>
            <CategoryContainer>{renderProducts(item)}</CategoryContainer>
          </>
        );
      });
    }
  }

  return (
    <Container>
      <Title>Produtos</Title>
      <Wrapper>
        <Body>{renderCategory()}</Body>
      </Wrapper>
      <PlusButton
        onClick={() => {
          setIsEditProduct(0);
          navigate(`${app_base_url}/create-products`);
        }}
      >
        <FiPlus size={"max(20px,2vw)"} />
      </PlusButton>
    </Container>
  );
};
