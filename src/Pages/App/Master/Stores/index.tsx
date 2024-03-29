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
export interface IStore {
  id: number;
  name: string;
  localization: string;
  creation_date: Date;
  maxPoints: number;
}
export const Stores = () => {
  const [stores, setStores] = useState({} as IStore[]);
  const [storeFocus, setStoreFocus] = useState({} as IStore);
  const { master, setSelectedStore, deleteStore } = useMaster();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  async function handleData() {
    try {
      const { data } = await api.get(`/store/`);
      if (data.sucess) {
        setStores(data.data);
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
    if (stores && stores.length > 0) {
      return stores.map((item) => {
        return (
          <Body
            onClick={() => {
              setSelectedStore(item.id);
              setStoreFocus(item);
            }}
          >
            <TBody>{item.id}</TBody>
            <TBody>{item.name}</TBody>
            <TBody>{item.localization}</TBody>
            <TBody>
              {new Date(item.creation_date).toLocaleDateString("pt-BR")}
            </TBody>
            <TBody onClick={() => deleteStore(item.id)}>
              <RiDeleteBin6Line />
            </TBody>
          </Body>
        );
      });
    }
  }

  return (
    <Container>
      <Title>Lojas</Title>
      <Table>
        <Header>
          <THead>CÓDIGO</THead>
          <THead>NOME</THead>
          <THead>LOCALIZAÇÃO</THead>
          <THead>DATA</THead>
        </Header>
        {renderData()}
      </Table>
      <StoreDetails
        open={storeFocus.id != undefined}
        onClose={() => setStoreFocus({} as IStore)}
        store={storeFocus}
      />
      <AiOutlinePlus
        onClick={() => navigate(`${app_base_url}/create-store`)}
        style={{ cursor: "pointer" }}
        size={"max(2vw,24px)"}
      />
    </Container>
  );
};
