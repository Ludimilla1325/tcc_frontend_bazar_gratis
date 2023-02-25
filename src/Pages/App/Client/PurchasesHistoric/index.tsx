import React, { useEffect, useState } from "react";
import { useCliente } from "../../../../Hooks/cliente";
import { Container, Title, Table, Thead, Th, TBody, Td } from "./styles";
import {CancelPurschase} from "../../../../components/Modals/CancelPurschase";
import api from "../../../../Services/api";
import theme from "../../../../Styles/theme";

export interface IPurchasesHistoric {
  appointment_date: Date;
  id: number;
  value: number;
  delivered: boolean;
}
export const PurchasesHistoric = () => {
  const { cliente, } = useCliente();
  const [data, setData] = useState({} as IPurchasesHistoric[]);
  const[itemFocus, setItemFocus] = useState({} as IPurchasesHistoric);
  const[cancelId, setCancelId] = useState(0);
  async function handleData() {
    try {
      const { data } = await api.get(`appointment-client`);
      setData(data.data);
    } catch (error) {}
  }

  useEffect(() => {
    handleData();
  }, [cancelId]);



  function renderData() {
    if (data && data.length > 0) {
      return data.map((item) => {
        return (
          <TBody>
            <Td>
              <span style={{ color: theme.colors.primary }}>
                {new Date(item.appointment_date).toLocaleDateString("pt-br")}
              </span>
            </Td>
            <Td>{item.value}</Td>
            <Td>{item.delivered ? "FINALIZADO" : "EM ANDAMENTO"}</Td>
            <Td>
              <span
                style={{ color: theme.colors.attention, cursor: "pointer" }}
                onClick={()=>setCancelId(item.id)}
              >
                {item.delivered ? "" : "Cancelar compra"}
              </span>
            </Td>
          </TBody>
        );
      });
    }
  }

  return (
    <Container>
      <Title>COMPRAS REGISTRADAS</Title>

      <Table>
        <Thead>
          <Th>Data de Retirada</Th>
          <Th>Total de Pontos</Th>
          <Th>Status</Th>
          <Th></Th>
        </Thead>

        {renderData()}
      </Table>

      <CancelPurschase 

      open={cancelId!=0}
      onClose={()=>{setCancelId(0)}}
      id={cancelId}

      />
    </Container>
  );
};
