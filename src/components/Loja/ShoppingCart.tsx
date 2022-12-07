import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { formatarDinheiro } from "../../Utils/formatarDinheiro";
import { CartItem } from "./CartItem";
import { useProdutos } from "../../Context/ProdutosContext";
import { useCliente } from "../../Hooks/cliente";
import api from "../../Services/api";
import { useState } from "react";
import { AppointmentDates } from "../Modals/AppointmentDates";
import DatePicker from "react-datepicker";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, removeFromCart } = useShoppingCart();
  const { produtos } = useProdutos();
  const { cliente, logar } = useCliente();
  const[agendamentoId,setAgendamentoId] = useState(0);
  const [appointmentModal, setAppointmentModal] = useState(false);

  function verificaValorFinal() {
    let valor_final = 0;
    cartItems.forEach((element) => {
      const item = produtos.find((i) => i.id === element.id);
      if (item) valor_final += element.quantity * item?.value;
    });
    return valor_final;
  }

  async function finalizarCompra(appointmentId:number) {
    if (cartItems.length > 0)
      try {
        if (cliente.points < verificaValorFinal()) {
          window.alert("Saldo indisponível para realizar esta compra!");
          return;
        }

       

        for (let index = 0; index < cartItems.length; index++) {
          const item = cartItems[index];
window.alert(item.quantity)
          await api.post("/purchase", {
            client_AppointmentId: appointmentId,
            productId: item.id,
            quantity: item.quantity,
          });

          if (index == cartItems.length - 1) {
            cartItems.forEach((element) => {
              removeFromCart(element.id);
            });
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        console.log("ACABOU!");
      }
  }

  return appointmentModal ? (
    <AppointmentDates
      open={appointmentModal}
      onClose={() => setAppointmentModal(false)}
      handleSetAgendamentoId={(id:number)=>finalizarCompra(id)}
      
    />
  ) : (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrinho</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div
            className="ms-auto fw-bold fs-5"
            style={{ display: "flex", flexDirection: "column" }}
          >
            Total{" "}
            {formatarDinheiro(
              cartItems.reduce((total, cartItem) => {
                if (produtos) {
                  if (produtos.length > 0) {
                    const item = produtos.find((i) => i.id === cartItem.id);
                    return total + (item?.value || 0) * cartItem.quantity;
                  }
                }
                return 0;
              }, 0)
            )}
            <button
              style={{ padding: 3 }}
              onClick={() => setAppointmentModal(true)}
            >
              Comprar
            </button>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
