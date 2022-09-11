import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import storeItems from "../../Data/items.json";
import { formatarDinheiro } from "../../Utils/formatarDinheiro";
import { useProdutos } from "../../Context/ProdutosContext";
import { useState } from "react";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const { produtos } = useProdutos();
  const item = handleFindProduto();

  if (item == null) return null;

  function handleFindProduto() {
    if (produtos) {
      if (produtos.length > 0) {
        return  Array.from(produtos).find((i) => i.id === id);
      }
    }
    return null;
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.foto}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.nome}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              X{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatarDinheiro(item.valor)}
        </div>
      </div>
      <div>
        {formatarDinheiro(item.valor * quantity)}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </div>
    </Stack>
  );
}
