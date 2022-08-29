import React from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../../../components/Layoult/Sidebar";
import { Container, Title } from "./styles";
import storeItems from "../../../Data/items.json";
import { StoreItem } from "../../../components/Loja/StoreItem";

export const Home = () => {
  return (
    <>
      <h2>Alimentos Básicos</h2>
      <Row md={2} xs={1} lg={4} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};
