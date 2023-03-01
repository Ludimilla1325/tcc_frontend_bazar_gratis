import { useSnackbar } from "notistack";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCliente } from "../Hooks/cliente";

import api from "../Services/api";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ProdutosContext = {
  produtos: StoreItemProps[];
  handleData: () => Promise<void>;
  handlefirstRender: () => void;
  firstRender: boolean;
};

export type StoreItemProps = {
  id: number;
  name: string;
  photo: string;
  categoryId: number;
  value: number;
  quantity: number;
  storeId: number;
  categoria: string;
};

const ProdutosContext = createContext({} as ProdutosContext);

export function useProdutos() {
  return useContext(ProdutosContext);
}

export function ProdutosProvider({ children }: ShoppingCartProviderProps) {
  const [produtos, setProdutos] = useState({} as StoreItemProps[]);
  const { cliente } = useCliente();
  const { enqueueSnackbar } = useSnackbar();
  const [firstRender, setFirstRender] = useState(false);

  function handlefirstRender() {
    setFirstRender(!firstRender);
  }

  async function handleData() {
    try {
      const { data } = await api.get("/product/" + cliente.storeId);

      setProdutos(data.data);
      handlefirstRender();
    } catch (e) {
      enqueueSnackbar(`Erro`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  useEffect(() => {
    // handleData();
  }, []);

  return (
    <ProdutosContext.Provider
      value={{
        produtos,
        handleData,
        handlefirstRender,
        firstRender,
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}
