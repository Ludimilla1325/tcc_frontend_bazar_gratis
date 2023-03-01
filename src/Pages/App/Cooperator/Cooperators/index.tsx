import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCooperator } from "../../../../Hooks/cooperator";
import { useMaster } from "../../../../Hooks/master";
import { useNavigate } from "react-router-dom";
import api from "../../../../Services/api";
import { cpfMask } from "../../../../Utils/cpfMask";
import { app_base_url } from "../../../../Utils/urls";
import { Container, Header, Table, THead, Title, Body, TBody } from "./styles";
import { useSnackbar } from "notistack";
export interface ICooperator {
  id: number;
  name: string;
  email: string;
  cpf: string;
  active: boolean;
  admin: boolean;
  storeId: number;
}
export const Cooperators = () => {
  const [cooperators, setCooperators] = useState({} as ICooperator[]);
  const { cooperator } = useCooperator();
  const [firstRender, setFirstRender] = useState(true);
  const {
    setIsEditedCooperator,
    setSelectedCooperator,
    selectedCooperator,
    isEditedCooperator,
    selectedStore,

    getCooperator,
    master,
  } = useMaster();
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  async function handleData() {
    try {
      const { data } = await api.get(
        `/cooperator/store/${
          cooperator.storeId ? cooperator.storeId : selectedStore
        }`
      );
      if (data.sucess) {
        setCooperators(data.data);
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
    setSelectedCooperator({});
    setIsEditedCooperator(0);
    setFirstRender(false);
  }, []);

  useEffect(() => {
    setSelectedCooperator({});
    setIsEditedCooperator(0);
  }, []);

  useEffect(() => {
    getCooperator(isEditedCooperator);
  }, [isEditedCooperator]);

  useEffect(() => {}, [isEditedCooperator]);

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    if (
      selectedCooperator &&
      selectedCooperator.id &&
      isEditedCooperator &&
      !firstRender
    ) {
      navigate(`${app_base_url}/create-cooperator`);
    }
  }, [selectedCooperator]);

  function renderData() {
    if (cooperators && cooperators.length > 0) {
      return cooperators.map((item) => {
        return (
          <Body
            onClick={() => {
              setIsEditedCooperator(item.id);
            }}
          >
            <TBody>{item.id}</TBody>
            <TBody>{item.name}</TBody>
            <TBody>{item.email}</TBody>
            <TBody>{cpfMask(item.cpf)}</TBody>
            <TBody>{item.active ? "A" : "I"}</TBody>
          </Body>
        );
      });
    }
  }

  return (
    <Container>
      <Title>Operadores</Title>
      <Table>
        <Header>
          <THead>CÓDIGO</THead>
          <THead>NOME</THead>
          <THead>EMAIL</THead>
          <THead>CPF</THead>
          <THead>ATIVO</THead>
        </Header>
        {renderData()}
      </Table>
    </Container>
  );
};
