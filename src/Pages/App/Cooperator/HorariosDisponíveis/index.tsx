import React, { useEffect, useState } from "react";
import { StoreDetails } from "../../../../components/Modals/StoreDetails";
import { useMaster } from "../../../../Hooks/master";
import api from "../../../../Services/api";
import { Container, Header, Table, THead, Title, Body, TBody } from "./styles";
import { AiOutlinePlus } from "react-icons/ai";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { app_base_url } from "../../../../Utils/urls";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCooperator } from "../../../../Hooks/cooperator";
export interface IAppointment {
  id: number;
  appointment_date: string;
  spots: number;
}
export const Appointment = () => {
  const [appointments, setAppointments] = useState({} as IAppointment[]);
  const [storeFocus, setStoreFocus] = useState({} as IAppointment);
  const { cooperator } = useCooperator();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { deleteAppointment } = useCooperator();
  async function handleData() {
    try {
      const { data } = await api.get(`/appointment/${cooperator.storeId}`);
      if (data.sucess) {
        setAppointments(data.data);
      } else {
        enqueueSnackbar(`${data.message}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (err) {}
  }
  useEffect(() => {
    handleData();
  }, []);

  function renderData() {
    if (appointments && appointments.length > 0) {
      return appointments.map((item) => {
        return (
          <Body>
            <TBody>{item.id}</TBody>

            <TBody>
              {new Date(item.appointment_date).toLocaleDateString("pt-BR")}
            </TBody>
            <TBody>{item.spots}</TBody>
            <TBody onClick={() => deleteAppointment(item.id)}>
              <RiDeleteBin6Line />
            </TBody>
          </Body>
        );
      });
    }
  }

  return (
    <Container>
      <Title>Horários Disponíveis</Title>
      <Table>
        <Header>
          <THead>CÓDIGO</THead>
          <THead>DATA</THead>
          <THead>VAGAS</THead>
        </Header>
        {renderData()}
      </Table>
    </Container>
  );
};
