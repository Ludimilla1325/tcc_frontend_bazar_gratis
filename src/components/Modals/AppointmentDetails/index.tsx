import React, { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

import Modal from "react-modal";
import { IAppointement } from "../../../Pages/App/Cooperator/Purchase";
import api from "../../../Services/api";
import theme from "../../../Styles/theme";
import {
  Container,
  DivX,
  Message,
  Title,
  Header,
  ProductContrainer,
  ProductsInformationContainer,
  Image,
  ProductTitle,
  ProductFooter,
  SpanFooter,
  Footer,
  OperationButton
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
    borderRadius: "0.25rem",
  },
};

interface Props {
  open: boolean;
  onClose(): void;
  appointementFocus: IAppointement;
}

interface IProductsDetails {
  id: number;
  productId: number;
  quantity: number;
  name: string;
  description: string;
  value: number;
  photo: string;
}

export function AppointmentDetails({
  open,
  onClose,
  appointementFocus,
}: Props) {
  const [products, setProducts] = useState({} as IProductsDetails[]);

  async function handleData() {
    try {
      const { data } = await api.get(`/purchase/${appointementFocus.id}`);
      if (data.sucess) {
        // window.alert(data.data);
        setProducts(data.data);
      } else {
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleData();
  }, [appointementFocus.id]);

  function renderData() {
    if (products && products.length > 0) {
      return products.map((item) => {
        return (
          <ProductContrainer>
            <Image src={item.photo} alt="Imagem Produto" />
            <ProductsInformationContainer>
              <ProductTitle>
                {item.name} - {item.description}
              </ProductTitle>

              <ProductFooter>
                <SpanFooter>Quantidade:{item.quantity}</SpanFooter>
                <SpanFooter>Valor Unitário: {item.value}</SpanFooter>
              </ProductFooter>
            </ProductsInformationContainer>
          </ProductContrainer>
        );
      });
    }
    return "";
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
        <Title>PEDIDO {appointementFocus.id}</Title>
        <Header>
          <Title>Cliente: {appointementFocus.name}</Title>
          <Title>
            Data de Entrega:{" "}
            {new Date(appointementFocus.appointment_date).toLocaleDateString(
              "pt-BR"
            )}
          </Title>
        </Header>
        {renderData()}
      </Container>

      <Footer>
          <OperationButton onClick={() =>onClose()}>
              VOLTAR
          </OperationButton>

          <OperationButton>
              CONFIRMAR ENTREGA
          </OperationButton>
      </Footer>
    </Modal>
  );
}
