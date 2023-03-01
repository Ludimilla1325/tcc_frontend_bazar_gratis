import React from "react";
import { FiX } from "react-icons/fi";

import Modal from "react-modal";
import theme from "../../../Styles/theme";
import { Container, DivX, Message, Title } from "./styles";

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
  error: { title: string; message: string };
}

export function Alert({ open, onClose, error }: Props) {
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
        <Title>{error.title}</Title>
        <Message>{error.message}</Message>
      </Container>
    </Modal>
  );
}
