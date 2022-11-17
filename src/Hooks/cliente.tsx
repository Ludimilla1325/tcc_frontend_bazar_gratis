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
  logar: (email: string, senha: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    phone: string,
    cpf: string,
    cep: string,
    storeId: number,
    password: string
  ) => Promise<void>;
  cliente: ICliente;
}

interface ICliente {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cep: string;
  storeId: number;
  password: string;
  points: number;
}

const ClienteContext = createContext({} as IClienteContextData);

function ClienteProvider({ children }: IClienteProviderProps) {
  const [logado, setLogado] = useState(false);
  const [cliente, setCliente] = useState({} as ICliente);

  async function logar(email: string, password: string) {
    let errorMessage = '';
    try {
      const { data } = await api.post("/client/login", { email, password });
     
      if (data.sucess) {
        setCliente(data.data.user);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.data.token}`;
        setLogado(true);
      } else {
        errorMessage = data.message
      }
      //window.alert(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      throw "Não foi possível efeturar o login!";
    }finally{
      if(errorMessage){
        throw errorMessage
      }
    }
  }

  async function register(client: any) {
    try {
      const { name, email, phone, cpf, cep, storeId, password } = client;
      const { data } = await api.post("/client/", {
        name,
        email,
        phone,
        cpf,
        cep,
        storeId,
        password,
      });

      if (data.sucess) {
        setCliente(data);
        setLogado(true);
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
      window.alert(JSON.stringify(data.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(cliente);
    //window.alert(JSON.stringify(cliente))
  }, [cliente]);
  return (
    <ClienteContext.Provider
      value={{
        logado,
        logar,
        register,
        cliente,
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
