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
import { FiPlus } from "react-icons/fi";
import { AddAppointmentsModal } from "./AddAppointmentsModal";
export interface IAppointment {
  id: number;
  appointment_date: string;
  spots: number;
}
export const Appointment = () => {
  const [appointments, setAppointments] = useState({} as IAppointment[]);
  const [appointmentFocus, setAppointmentFocus] = useState({} as IAppointment);
  const { cooperator } = useCooperator();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { deleteAppointment } = useCooperator();
  const [openDatesModal, setOpenDatesModal] = useState(false);
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
            <TBody
              onClick={() => {
                setAppointmentFocus(item);
                setOpenDatesModal(true);
              }}
            >
              {item.id}
            </TBody>
            <TBody
              onClick={() => {
                setAppointmentFocus(item);
                setOpenDatesModal(true);
              }}
            >
              {new Date(item.appointment_date).toLocaleDateString("pt-BR")}
            </TBody>
            <TBody
              onClick={() => {
                setAppointmentFocus(item);
                setOpenDatesModal(true);
              }}
            >
              {item.spots}
            </TBody>
            
            <TBody
              onClick={async () => {
                await deleteAppointment(item.id);
                handleData();
              }}
            >
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
      <FiPlus
        size={"max(2vw,22px)"}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setAppointmentFocus({} as IAppointment);
          setOpenDatesModal(true);
        }}
      />

      <AddAppointmentsModal
        open={openDatesModal}
        onClose={() => {
          handleData();
          setOpenDatesModal(false);
        }}
        appointmentFocus={appointmentFocus}
      />
    </Container>
  );
};
