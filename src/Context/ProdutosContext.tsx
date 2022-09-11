import { createContext, ReactNode, useContext, useState } from "react";

import api from "../Services/api";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ProdutosContext = {
 produtos:StoreItemProps[]
 handleData:()=>Promise<void>;
};

export type StoreItemProps = {
    id:number;
    categoria:string;
    nome:string;
    descricao:string;
    foto:string;
    categoria_id:number;
    valor:number;
    quantidade:number;
    lojaId:number;
};

const ProdutosContext = createContext({} as ProdutosContext);

export function useProdutos() {
  return useContext(ProdutosContext);
}

export function ProdutosProvider({ children }: ShoppingCartProviderProps) {
  const [produtos, setProdutos] = useState({} as StoreItemProps[]);


  async function handleData() {
    try {
      const { data } = await api.get("/produto/1");

      setProdutos(data);
    } catch (e) {
      window.alert(e);
      console.log(e);
    }
  }
 

  return (
    <ProdutosContext.Provider
      value={{
       produtos,
       handleData
      }}
    >
      {children}
     
    </ProdutosContext.Provider>
  );
}
