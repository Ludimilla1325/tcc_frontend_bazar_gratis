import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { AppointmentDetails } from "../../../../components/Modals/AppointmentDetails";
import { useCooperator } from "../../../../Hooks/cooperator";
import api from "../../../../Services/api";
import theme from "../../../../Styles/theme";
import {
  Container,
  Header,
  Table,
  THead,
  Title,
  Body,
  TBody,
  TableContainer,
  HandlerDiv,
  ButtonsDiv,
  Button,
} from "./styles";
export interface IAppointement {
  id: number;
  value: number;
  appointment_date: Date;
  delivered: boolean;
  name: string;
  itens: number;
}
export const Purchase = () => {
  const [appointements, setAppointements] = useState({} as IAppointement[]);
  const [statusList, setStatusList] = useState(1 as 1 | 2);
  const { cooperator } = useCooperator();
  const [appointementsFocus, setAppointementFocus] = useState(
    {} as IAppointement
  );

  const { enqueueSnackbar } = useSnackbar();
  async function handleData() {
    try {
      const { data } = await api.get(`/appointment-client`);
      console.log(data);

      if (data.sucess) {
        setAppointements(data.data);
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
    handleData();
  }, [appointementsFocus]);

  function renderData() {
    if (appointements && appointements.length > 0) {
      return appointements.map((item) => {
        if (
          (statusList == 1 && !item.delivered) ||
          (statusList == 2 && item.delivered)
        )
          return (
            <Body
              onClick={() => {
                setAppointementFocus(item);
              }}
            >
              <TBody>{item.id}</TBody>
              <TBody>
                {new Date(item.appointment_date).toLocaleDateString("pt-BR")}
              </TBody>
              <TBody>{item.itens}</TBody>
              <TBody>{item.name}</TBody>
              <TBody>{item.value}</TBody>
            </Body>
          );
      });
    }
  }

  return (
    <Container>
      <Title>Pedidos</Title>
      <HandlerDiv>
        <ButtonsDiv>
          <Button
            onClick={() => {
              setStatusList(1);
            }}
            style={{
              backgroundColor:
                statusList == 1 ? theme.colors.darkGrey : theme.colors.dark,
            }}
          >
            PENDENTES
          </Button>
          <Button
            onClick={() => {
              setStatusList(2);
            }}
            style={{
              backgroundColor:
                statusList == 2 ? theme.colors.darkGrey : theme.colors.dark,
            }}
          >
            ENTREGUES
          </Button>
        </ButtonsDiv>
        <TableContainer>
          <Table>
            <Header>
              <THead>PEDIDO</THead>
              <THead>ENTREGA</THead>
              <THead>ITENS</THead>
              <THead>USUÁRIO</THead>
              <THead>VALOR</THead>
            </Header>
            {renderData()}
          </Table>
        </TableContainer>
      </HandlerDiv>
      <AppointmentDetails
        open={!!appointementsFocus.id}
        onClose={() => setAppointementFocus({} as IAppointement)}
        appointementFocus={appointementsFocus}
      />
    </Container>
  );
};
