import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { formatarDinheiro } from "../../Utils/formatarDinheiro";
import { useProdutos } from "../../Context/ProdutosContext";
import { baseUrlApi } from "../../Utils/urls";

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
        return Array.from(produtos).find((i) => i.id === id);
      }
    }
    return null;
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={
          item.photo.indexOf("http") != -1
            ? item.photo
            : baseUrlApi + "/photo/" + item.photo
        }
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              X{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatarDinheiro(item.value)}
        </div>
      </div>
      <div>
        {formatarDinheiro(item.value * quantity)}
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
