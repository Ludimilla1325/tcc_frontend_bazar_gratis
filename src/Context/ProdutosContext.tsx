import { useSnackbar } from "notistack";
import { createContext, ReactNode, useContext, useState } from "react";
import { useCliente } from "../Hooks/cliente";

import api from "../Services/api";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ProdutosContext = {
  produtos: StoreItemProps[];
  handleData: () => Promise<void>;
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
  const{cliente} = useCliente();
  const { enqueueSnackbar } = useSnackbar();
  async function handleData() {
    try {
      const { data } = await api.get("/product/"+cliente.storeId);

      setProdutos(data.data);
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

  return (
    <ProdutosContext.Provider
      value={{
        produtos,
        handleData,
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}
