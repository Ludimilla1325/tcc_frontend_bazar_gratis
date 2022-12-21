import { userInfo } from "os";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../Services/api";
import { clienteLocalStorage, tokenLocalStorage } from "../Utils/localStorage";

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
  updatePassword: (oldPass: string, newPass: string) => Promise<void>;
  getProfile: () => Promise<ICliente>;
  clienteStore: any;
  pointsSolicitation: (
    quantity: string,
    client_justification: string
  ) => Promise<any>;
  pointsSolicitationList: IPointsSolicitation[];
  updateProfile: (
    name: string,
    phone: string,
    cep: string,
    storeId: number
  ) => Promise<any>;
  sendLinkToResetPass: (email: string) => Promise<any>;
  getPointsSolicitationHistoric(): Promise<void>;
  setClienteStore: any;
  logOut():void;
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

export interface IPointsSolicitation {
  id: number;
  clientId: number;
  quantity: number;
  request_date: Date;
  status: string;
  employeeId: number;
  client_justification: string;
  employee_justification: string;
  name: string;
}

const ClienteContext = createContext({} as IClienteContextData);

function ClienteProvider({ children }: IClienteProviderProps) {
  const [logado, setLogado] = useState(false);
  const [cliente, setCliente] = useState({} as ICliente);
  const [clienteStore, setClienteStore] = useState({} as any);
  const [pointsSolicitationList, setPointsSolicitationList] = useState(
    {} as IPointsSolicitation[]
  );

  function saveLocalStorage(cliente:ICliente,token:string){
    localStorage.setItem(clienteLocalStorage, JSON.stringify(cliente));
    localStorage.setItem(tokenLocalStorage, token);
  }

  function getLocalStorage(){
    const usuario = localStorage.getItem(clienteLocalStorage);
    const token = localStorage.getItem(tokenLocalStorage);
    if(usuario && token){
      setCliente(JSON.parse(usuario));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
        setLogado(true);
    }
    
   
  }



  function deleteLocalStorage(){
    localStorage.removeItem(clienteLocalStorage);
    localStorage.removeItem(tokenLocalStorage);
  }

 function logOut(){
    setCliente({} as ICliente);
    setLogado(false)
    deleteLocalStorage();
  }

  useEffect(()=>{
    getLocalStorage();
  },[])

  async function logar(email: string, password: string) {
    let errorMessage = "";
    try {
      const { data } = await api.post("/client/login", { email, password });
      window.alert(JSON.stringify(data));
      if (data.sucess) {
        setCliente(data.data.user);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;
        saveLocalStorage(data.data.user, data.data.token)
        setLogado(true);
      } else {
        errorMessage = data.message;
      }
      //window.alert(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      throw "Não foi possível efeturar o login!";
    } finally {
      if (errorMessage) {
        throw errorMessage;
      }
    }
  }

  async function sendLinkToResetPass(email: string) {
    try {
      const { data } = await api.post("/client/link-to-reset-pass", { email });
      console.log(data);

      if (data.sucess) {
        window.alert(JSON.stringify(data.data));
      } else {
        window.alert(data.message);
      }
    } catch (error) {
      console.log(error);
      window.alert(JSON.stringify("Não foi possível enviar o token!"));
    }
  }

  async function register(
    name: string,
    email: string,
    phone: string,
    cpf: string,
    cep: string,
    storeId: number,
    password: string
  ) {
    try {
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

  async function pointsSolicitation(
    quantity: string,
    client_justification: string
  ) {
    try {
      const clientId = +cliente.id;

      const { data } = await api.post("/pointsSolicitation/", {
        clientId,
        quantity,
        client_justification,
      });

      if (data.sucess) {
        window.alert(JSON.stringify(data.message));
      } else {
        //MENSSAGEM DE ERRO
        window.alert(JSON.stringify(data.message));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getPointsSolicitationHistoric() {
    const clientId = +cliente.id;
    try {
      const { data } = await api.get(
        `/pointsSolicitation/?clientId=${clientId}`
      );

      if (data.sucess) {
        console.log("data", data);
        //window.alert(JSON.stringify(data))
        setPointsSolicitationList(data.data);
        return data;
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile(
    name: string,
    phone: string,
    cep: string,
    storeId: number
  ) {
    const email = cliente.email;
    try {
      const { data } = await api.put("/client/", {
        name,
        email,
        phone,
        cep,
        storeId,
      });

      if (data.sucess) {
        window.alert(JSON.stringify("Atualizado com sucesso"));
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePassword(oldPassword: string, newPassword: string) {
    const email = cliente.email;
    try {
      const { data } = await api.put("/client/pass", {
        email,
        oldPassword,
        newPassword,
      });

      if (data.sucess) {
        window.alert(JSON.stringify("Atualizado com sucesso"));
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getProfile() {
    const email = cliente.email;
    try {
      const { data } = await api.get(`/client/${email}`);

      if (data.sucess) {
        console.log("data", data);
        setClienteStore(data.data);
        return data;
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log("cliente", cliente);
  console.log("clienteStore", clienteStore);

  useEffect(() => {
    getProfile();
    // if (cliente.id) {

    //   pointsSolicitationHistoric();
    // }
  }, [cliente]);

  useEffect(() => {
    //window.alert(JSON.stringify(cliente))
  }, [cliente]);

  return (
    <ClienteContext.Provider
      value={{
        logOut,
        logado,
        logar,
        register,
        cliente,
        updatePassword,
        getProfile,
        clienteStore,
        pointsSolicitation,
        pointsSolicitationList,
        updateProfile,
        sendLinkToResetPass,
        getPointsSolicitationHistoric,
        setClienteStore,
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
