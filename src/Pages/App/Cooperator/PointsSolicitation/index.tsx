import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { AppointmentDetails } from "../../../../components/Modals/AppointmentDetails";
import { PointsSolicitationDetails } from "../../../../components/Modals/PointsSolicitationDetails";
import { IPointsSolicitation } from "../../../../Hooks/cliente";
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

export const PointsSolicitation = () => {
  const [appointements, setAppointements] = useState(
    {} as IPointsSolicitation[]
  );
  const [statusList, setStatusList] = useState(1 as 1 | 2);
  const [solicitationFocus, setSolicitationFocus] = useState(
    {} as IPointsSolicitation
  );

  const { enqueueSnackbar } = useSnackbar();
  const { cooperator } = useCooperator();

  async function handleData() {
    try {
      const { data } = await api.get(
        `/pointsSolicitation?loja_id=${cooperator.storeId}`
      );
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
  }, [solicitationFocus]);

  function renderData() {
    if (appointements && appointements.length > 0) {
      return appointements.map((item) => {
        if (
          (statusList == 1 && !item.employeeId) ||
          (statusList == 2 && item.employeeId)
        )
          return (
            <Body
              onClick={() => {
                setSolicitationFocus(item);
              }}
            >
              <TBody>{item.id}</TBody>
              <TBody>
                {new Date(item.request_date).toLocaleDateString("pt-BR")}
              </TBody>
              <TBody>{item.name}</TBody>
              <TBody>{item.quantity}</TBody>
              <TBody>{item.status}</TBody>
            </Body>
          );
      });
    }
  }

  return (
    <Container>
      <Title>Solicitação de Pontos</Title>
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
            ANALISADOS
          </Button>
        </ButtonsDiv>
        <TableContainer>
          <Table>
            <Header>
              <THead>PEDIDO</THead>
              <THead>DATA</THead>
              <THead>USUÁRIO</THead>
              <THead>PONTOS</THead>
              <THead>STATUS</THead>
            </Header>
            {renderData()}
          </Table>
        </TableContainer>
      </HandlerDiv>
      <PointsSolicitationDetails
        open={!!solicitationFocus.id}
        onClose={() => setSolicitationFocus({} as IPointsSolicitation)}
        solicitacao={solicitationFocus}
      />
    </Container>
  );
};
