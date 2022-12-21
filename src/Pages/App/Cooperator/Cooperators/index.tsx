import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCooperator } from "../../../../Hooks/cooperator";
import api from "../../../../Services/api";
import { cpfMask } from "../../../../Utils/cpfMask";
import {Container,Header,Table, THead,Title,Body,TBody} from "./styles";
export interface ICooperator {
  id: number;
  name: string;
  email: string;
  cpf: string;
  active: boolean;
  admin: boolean;
  storeId: number;
}
export const Cooperators = () => {
  const [cooperators, setCooperators] = useState({} as ICooperator[]);
  const { cooperator } = useCooperator();
  const { storeId } = useParams();
  async function handleData() {
    try {

      const { data } = await api.get(`/cooperator/store/${storeId?storeId:cooperator.storeId}`);
      if (data.sucess) {
       // window.alert(data.data);
        setCooperators(data.data);
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
    if (cooperators && cooperators.length > 0) {
      return cooperators.map((item) => {
        return (
          <Body onClick={()=>{
            window.alert("MODAL DE EDITAR AINDA NAO CRIADO")
          }}>
            <TBody>{item.id}</TBody>
            <TBody>{item.name}</TBody>
            <TBody>{item.email}</TBody>
            <TBody>{cpfMask(item.cpf)}</TBody>
            <TBody>{item.active ? "A" : "I"}</TBody>
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
              <THead>EMAIL</THead>
              <THead>CPF</THead>
              <THead>ATIVO</THead>
              
          </Header>
          {renderData()}
          </Table>
    </Container>
  );
};
