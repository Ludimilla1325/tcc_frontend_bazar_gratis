import React, { useEffect, useState } from "react";
import { useMaster } from "../../../../Hooks/master";
import api from "../../../../Services/api";
import { Container, Header, Table, THead, Title, Body, TBody } from "./styles";
export interface IStore {
  id: number;
  name: string;
  localization: string;
  creation_date: Date;
  maxPoints: number;
}
export const Stores = () => {
  const [stores, setStores] = useState({} as IStore[]);
  const { master } = useMaster();
  async function handleData() {
    try {
      const { data } = await api.get(`/store/`);
      if (data.sucess) {
        // window.alert(data.data);
        setStores(data.data);
      } else {
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleData();
  }, []);

  function renderData() {
    if (stores && stores.length > 0) {
      return stores.map((item) => {
        return (
          <Body
            onClick={() => {
              window.alert("MODAL DE EDITAR AINDA NAO CRIADO");
            }}
          >
            <TBody>{item.id}</TBody>
            <TBody>{item.name}</TBody>
            <TBody>{item.localization}</TBody>
            <TBody>{new Date(item.creation_date).toLocaleDateString('pt-BR')}</TBody>
            
          </Body>
        );
      });
    }
  }

  return (
    <Container>
      <Title>Operadores</Title>
      <Table>
        <Header>
          <THead>CÓDIGO</THead>
          <THead>NOME</THead>
          <THead>LOCALIZAÇÃO</THead>
          <THead>DATA</THead>
        </Header>
        {renderData()}
      </Table>
    </Container>
  );
};
