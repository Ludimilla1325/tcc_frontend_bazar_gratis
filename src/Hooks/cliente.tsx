import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../Services/api";

interface IClienteProviderProps {
  children: ReactNode;
}

interface IClienteContextData {
  logado: boolean;
  logar: () => void;
  cliente:ICliente;
}

interface ICliente{
  id:number;
  nome:string;
  email:string;
  telefone:string;
  cpf:string;
  cep:string;
  lojaId:number;
  senha:string;
  pontos:number;
}

const ClienteContext = createContext({} as IClienteContextData);

function ClienteProvider({ children }: IClienteProviderProps) {
  const [logado, setLogado] = useState(false);
  const[cliente,setCliente] = useState({} as ICliente);
  async function  logar() {
    try {
      const {data} = await api.post("/cliente/login",{email:"ricardinhogiasson16@gmail.com"});
      setCliente(data);
      setLogado(true);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    logar()
  },[])

  useEffect(() => {
    console.log(cliente)
    //window.alert(JSON.stringify(cliente))
  },[cliente])
  return (
    <ClienteContext.Provider
      value={{
        logado,
        logar,
        cliente
      }}
    >
      <>{children}</>
    </ClienteContext.Provider>
  );
}

function useCliente() {
  const context = useContext(ClienteContext);

  return context;
}

export { ClienteProvider, useCliente };
