import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../../../components/Layout/Sidebar/Sidebar";
import { Container, Title } from "./styles";
import storeItems from "../../../Data/items.json";
import { StoreItem } from "../../../components/Loja/StoreItem";
import api from "../../../Services/api";
import { AiFillExperiment } from "react-icons/ai";
import { Prev } from "react-bootstrap/esm/PageItem";
import { StoreItemProps } from "../../../Context/ProdutosContext";
import { useProdutos } from "../../../Context/ProdutosContext";
import { useCliente } from "../../../Hooks/cliente";

interface IHandleProdutoCard {
  categoria: string;
  produtos: StoreItemProps[];
}

export const Home = () => {
  const { cliente } = useCliente();
  const { produtos, handleData } = useProdutos();
  const [handleCard, setHandleCard] = useState([] as IHandleProdutoCard[]);

  useEffect(() => {
    handleData();
  }, []);

  console.log("produtos", produtos);

  function auxAddCategoria(categoria: string) {
    if (produtos) {
      if (produtos.length > 0) {
        const itens = produtos.filter((item) => item.categoria == categoria);
        return {
          categoria: categoria,
          produtos: itens,
        };
      }
    }
    return {
      categoria: "",
      produtos: [],
    };
  }

  useEffect(() => {
    let aux_categoria = "";
    let aux_categorias = [""];
    if (produtos) {
      if (produtos.length > 0) {
        produtos.forEach((element) => {
          if (element.categoria != aux_categoria) {
            aux_categorias.push(element.categoria);
            aux_categoria = element.categoria;
          }
        });
      }
      if (aux_categorias.length > 0)
        aux_categorias.forEach((element) => {
          const novos_elementos = auxAddCategoria(element);
          setHandleCard((prev) =>
            prev.length > 0 ? [...prev, novos_elementos] : [novos_elementos]
          );
        });
    }
  }, [produtos.length]);

  useEffect(() => {}, [handleCard]);

  function renderItens(params: StoreItemProps[]) {
    if (params) {
      if (params.length > 0) {
        return params.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ));
      }
    }
  }

  function renderRows() {
    if (handleCard) {
      if (handleCard.length > 0) {
        return handleCard.map((item) => {
          return (
            <>
              <h2>{item.categoria} </h2>
              <Row md={2} xs={1} lg={4} className="g-3">
                {renderItens(item.produtos)}
              </Row>
            </>
          );
        });
      }
    }
  }

  return <>{renderRows()}</>;
};
