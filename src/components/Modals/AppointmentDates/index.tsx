import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./picker.css";
import { FiPlus, FiX } from "react-icons/fi";
import Modal from "react-modal";
import theme from "../../../Styles/theme";
import { Button, Container, DivX, Label, Message, Title } from "./styles";
import pt_BR from "date-fns/locale/pt-BR"; // the locale you want
import api from "../../../Services/api";
import { useCliente } from "../../../Hooks/cliente";
import { useSnackbar } from "notistack";
registerLocale("pt_BR", pt_BR); // register it with the name you want

interface IAppointment {
  id: number;
  appointment_date: Date;
  spots: number;
  storeId: number;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "50vh",
    backgroundColor: "transparent",
    borderRadius: "0.25rem",
    border: "none",
  },
};

interface Props {
  open: boolean;
  onClose(): void;
  handleSetAgendamentoId(id: number): void;
}

export function AppointmentDates({
  open,
  onClose,
  handleSetAgendamentoId,
}: Props) {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [dates, setDates] = useState(["2022-12-5"]);
  const [appointments, setAppointments] = useState({} as IAppointment[]);
  const { cliente ,refreshAccount} = useCliente();

  const { enqueueSnackbar } = useSnackbar();

  async function handleData() {
    try {
      const { data } = await api.get(`/appointment/${cliente.storeId}`);
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
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleData();
  }, [open]);

  useEffect(() => {
    handleDates();
  }, [appointments]);

  function handleDates() {
    const helperDatas: string[] = [];
    for (let index = 0; index < appointments.length; index++) {
      const element = appointments[index];

      const d = new Date(element.appointment_date);
      helperDatas.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
    }
    setDates(helperDatas);
  }

  useEffect(() => {}, [dates]);

  function checkDate(d: Date) {
    const index = dates.indexOf(
      `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    );
    return index >= 0 ? true : false;
  }

  function handleSetDate(date: Date) {
    setAppointmentDate(date);
  }

  return (
    <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
      <Container>
        <DivX>
          <FiX
            onClick={onClose}
            style={{ cursor: "pointer" }}
            color={theme.colors.fullDark}
            size={"max(0.6vw +  6px)"}
          />
        </DivX>

        <Label>
          <Title>Selecione o dia para retirada da compra!</Title>
          <DatePicker
            selected={appointmentDate}
            onChange={handleSetDate}
            filterDate={checkDate}
            minDate={new Date()}
            locale="pt_BR"
            dateFormat="dd/MM/yyyy"
            startOpen
          />
        </Label>

        <Button
          onClick={async () => {
            const { data } = await api.post(`/appointment-client/`, {
              appointmentId: appointments.filter(
                (item) =>
                  `${new Date(item.appointment_date).getFullYear()}-${
                    new Date(item.appointment_date).getMonth() + 1
                  }-${new Date(item.appointment_date).getDate()}` ==
                  `${appointmentDate.getFullYear()}-${
                    appointmentDate.getMonth() + 1
                  }-${appointmentDate.getDate()}`
              )[0].id,
              clientId: cliente.id,
            });
            if (data.sucess) {
              
              handleSetAgendamentoId(data.data.id);
         
            } else {
              enqueueSnackbar(`${data.message}`, {
                variant: "error",
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
              });
            }
            onClose();
          }}
        >
          Confirmar
        </Button>
      </Container>
    </Modal>
  );
}
