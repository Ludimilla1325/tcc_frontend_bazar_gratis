import React, { useEffect, useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";

import { FiPlus, FiX } from "react-icons/fi";
import "./picker.css";
import Modal from "react-modal";
import theme from "../../../../../Styles/theme";
import pt_BR from "date-fns/locale/pt-BR"; // the locale you want
import { Container, DivX, Message, Label, Button, ButtonsDiv } from "./styles";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../../../../Services/api";
import { useCooperator } from "../../../../../Hooks/cooperator";
import { IAppointment } from "../index";
registerLocale("pt_BR", pt_BR); // register it with the name you want
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",

    minWidth: "40%",
    maxWidth: "80%",
    // height:"50vh",
    borderRadius: "0.25rem",
  },
};

interface Props {
  open: boolean;
  onClose(): void;
  appointmentFocus: IAppointment;
}

export function AddAppointmentsModal({
  open,
  onClose,
  appointmentFocus,
}: Props) {
  const { cooperator } = useCooperator();
  const [appointmentDate, setAppointmentDate] = useState(null as Date | null);
  const [spots, setSpots] = useState(0);

  useEffect(() => {
    if (
      appointmentFocus.appointment_date != null &&
      appointmentFocus.appointment_date != undefined
    ) {
      setAppointmentDate(new Date(appointmentFocus.appointment_date));
    } else {
      setAppointmentDate(null);
    }
    if (appointmentFocus.spots) {
      setSpots(appointmentFocus.spots);
    } else {
      setSpots(0);
    }
  }, [open, appointmentFocus]);

  function handleSetDate(date: Date) {
    setAppointmentDate(date);
  }

  async function post() {
    if (appointmentDate == null) {
      window.alert("Uma data deve ser selecionada!");
    }
    if (spots <= 0) {
      window.alert("O número de vagas deve ser maior que 0!");
    }
    try {
        if(appointmentFocus.id){
            await api.put("/appointment", {
                id:appointmentFocus.id,
                appointment_date: appointmentDate,
                spots: spots,
                storeId: cooperator.storeId,
              });
        }else{
            await api.post("/appointment", {
                appointment_date: appointmentDate,
                spots: spots,
                storeId: cooperator.storeId,
              });
        }
     
      onClose();
    } catch (err) {}
  }

  return (
    <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
      <Container>
        {/* <DivX>
          <FiX
            onClick={onClose}
            style={{ cursor: "pointer" }}
            color={theme.colors.fullDark}
            size={"max(0.6vw +  6px)"}
          />
        </DivX> */}
        <Label htmlFor="">
          Data
          <div style={{ visibility: "inherit" }}>
            <DatePicker
              selected={appointmentDate}
              onChange={handleSetDate}
              minDate={new Date()}
              locale="pt_BR"
              dateFormat="dd/MM/yyyy"
              //   startOpen
            />
          </div>
        </Label>

        <Label htmlFor="">
          Vagas
          <input
            type="text"
            value={spots}
            onChange={(ev) => setSpots(Number(ev.target.value))}
          />
        </Label>
        <ButtonsDiv>
          <Button onClick={onClose}>CANCELAR</Button>
          <Button onClick={post}>CONFIRMAR</Button>
        </ButtonsDiv>
      </Container>
    </Modal>
  );
}
