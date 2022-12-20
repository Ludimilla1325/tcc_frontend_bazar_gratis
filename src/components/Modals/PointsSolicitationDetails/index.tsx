import React, { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

import Modal from "react-modal";
import { IPointsSolicitation } from "../../../Hooks/cliente";
import { useCooperator } from "../../../Hooks/cooperator";
import theme from "../../../Styles/theme";
import {
  Body,
  Container,
  DivX,
  HandleButtonsDiv,
  Header,
  HelperHeader,
  OperationButton,
  SpanHeader,
  Textarea,
} from "./styles";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",

    minWidth: "60%",
    maxWidth: "80%",
    borderRadius: "0.25rem",
  },
};

interface Props {
  open: boolean;
  onClose(): void;
  solicitacao: IPointsSolicitation;
}

export function PointsSolicitationDetails({
  open,
  onClose,
  solicitacao,
}: Props) {
  const [justificatiaOperador, setJustificativaOperador] = useState("");
  const [confirmar, setConfimar] = useState(null as null | false | true);
  const{cooperator,logado} = useCooperator();
  useEffect(() => {
    if (solicitacao && solicitacao.employee_justification) {
      setJustificativaOperador(solicitacao.employee_justification);
      setConfimar(null);
    }
  }, [solicitacao]);


  async function post() {
      
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

        <Header>
          <SpanHeader>PEDIDO {solicitacao.id}</SpanHeader>
          <HelperHeader>
            <SpanHeader>CLIENTE :{solicitacao.name}</SpanHeader>

            <SpanHeader>
              DATA DO PEDIDO:{" "}
              {new Date(solicitacao.request_date).toLocaleDateString("pt-br")}
            </SpanHeader>
          </HelperHeader>

          <SpanHeader>QUANTIDADE: {solicitacao.quantity}</SpanHeader>
        </Header>
        <Body>
          <Textarea
            value={solicitacao.client_justification}
            disabled={true}
          ></Textarea>
          <HandleButtonsDiv hidden={!logado }>
            <OperationButton
              focus={confirmar == false}
              onClick={() => setConfimar(false)}
            >
              Não fornecer
            </OperationButton>

            <OperationButton
              focus={confirmar == true}
              onClick={() => setConfimar(true)}
            >
              Fornecer
            </OperationButton>
          </HandleButtonsDiv>
          <Textarea
            value={justificatiaOperador}
            disabled={solicitacao.status?.toLowerCase() != "p" ? true : false}
            onChange={(ev) => setJustificativaOperador(ev.target.value)}
            placeholder="Justificativa"
          ></Textarea>

          <HandleButtonsDiv hidden={!logado }>
            <OperationButton
              focus={confirmar != null && justificatiaOperador.length > 0}
              disabled={confirmar == null && justificatiaOperador.length == 0}
              onClick={() => post}
            >
              Enviar
            </OperationButton>
          </HandleButtonsDiv>


          <HandleButtonsDiv hidden={logado }>
            <OperationButton
              focus={true}
             
              onClick={onClose}
            >
              Voltar
            </OperationButton>
          </HandleButtonsDiv>
        </Body>
      </Container>
    </Modal>
  );
}