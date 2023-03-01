import React from "react";
import { FiX } from "react-icons/fi";

import Modal from "react-modal";
import api from "../../../Services/api";
import theme from "../../../Styles/theme";
import { Button, Container, DivX, Title } from "./styles";

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
    borderRadius: "0.25rem",
  },
};

interface Props {
  open: boolean;
  onClose(): void;
  id: number;
}

export function CancelPurschase({ open, onClose, id }: Props) {
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
        <Title>Tem certeza que deseja cancelar a compra?</Title>

        <Button
          onClick={async () => {
            await api.delete(`/appointment-client/${id}`);
            onClose();
          }}
        >
          CONFIRMAR
        </Button>
      </Container>
    </Modal>
  );
}
