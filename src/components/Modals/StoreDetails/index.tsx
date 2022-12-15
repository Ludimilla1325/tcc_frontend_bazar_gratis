import React, { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";

import Modal from "react-modal";
import { IStore } from "../../../Pages/App/Master/Stores";
import theme from "../../../Styles/theme";
import {FiShoppingCart} from "react-icons/fi"
import {
  Container,
  ContainerData,
  DataSpan,
  DivX,
  HandlerContainerData,
  Label,
  Title,
} from "./styles";
import { ICooperator } from "../../../Pages/App/Cooperator/Cooperators";
import api from "../../../Services/api";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../Utils/urls";

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
  store: IStore;
}

export function StoreDetails({ open, onClose, store }: Props) {
    const [cooperators, setCooperators] = useState({} as ICooperator[]);
    const navigate = useNavigate();

    async function handleData() {
        const {data} = await api.get(`/cooperator/store/${store.id}`);
        if(data.sucess){
            setCooperators(data.data);
        }
    }

    useEffect(() => {
        if(store.id)
        handleData()
    },[store.id])



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
        <Title>Detalhes da Loja</Title>

        <ContainerData>
          <Label>Localização</Label>
          <DataSpan>{store.localization}</DataSpan>
        </ContainerData>

        <HandlerContainerData>
          <ContainerData>
            <Label>Data de Criação</Label>
            <DataSpan>
              {new Date(store.creation_date).toLocaleDateString("pt-BR")}
            </DataSpan>
          </ContainerData>
          <ContainerData>
            <Label style={{"display":"flex", alignItems:"center", cursor:"pointer"}}
            onClick={() =>  navigate(`${app_base_url}/funcionarios/${store.id}`)}
            >Funcionários <FiSearch/></Label>
            <DataSpan>{cooperators.length}</DataSpan>
          </ContainerData>
        </HandlerContainerData>
        <FiShoppingCart 
        
        size={"max(2vw, 24px)"} style={{cursor:"pointer"}} 
        onClick={()=>navigate(`${app_base_url}/produtos/${store.id}`)}/>
      </Container>

    </Modal>
  );
}
