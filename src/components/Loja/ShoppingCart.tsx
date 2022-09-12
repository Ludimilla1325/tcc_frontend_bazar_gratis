import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { formatarDinheiro } from "../../Utils/formatarDinheiro";
import { CartItem } from "./CartItem";
import { useProdutos } from "../../Context/ProdutosContext";
import { useCliente } from "../../Hooks/cliente";
import api from "../../Services/api";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, removeFromCart } = useShoppingCart();
  const { produtos } = useProdutos();
  const { cliente, logar } = useCliente();

  function verificaValorFinal() {
    let valor_final = 0;
    cartItems.forEach((element) => {
      const item = produtos.find((i) => i.id === element.id);
      if (item) valor_final += element.quantity * item?.valor;
    });
    return valor_final;
  }

  async function finalizarCompra() {
    if (cartItems.length > 0)
      try {
        if (cliente.pontos < verificaValorFinal()) {
          window.alert("Saldo indisponível para realizar esta compra!");
          return;
        }

        const { data } = await api.post("/agendamento-cliente/", {
          agendamentoId: 1,
          clienteId: 2,
          entregue: false,
        });

        for (let index = 0; index < cartItems.length; index++) {
          const item = cartItems[index];

          await api.post("/compra", {
            agendamentoId: 1,
            produtoId: item.id,
            quantidade: item.quantity,
          });

          if (index == cartItems.length - 1) {
            cartItems.forEach((element) => {
              removeFromCart(element.id);
            });
            logar();
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        console.log("ACABOU!");
      }

  }

  return (
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
                    return total + (item?.valor || 0) * cartItem.quantity;
                  }
                }
                return 0;
              }, 0)
            )}
            <button style={{ padding: 3 }} onClick={() => finalizarCompra()}>
              Comprar
            </button>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
