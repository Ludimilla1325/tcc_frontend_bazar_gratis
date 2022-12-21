import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../Services/api";
import { masterLocalStorage, tokenLocalStorage } from "../Utils/localStorage";

interface IMasterProviderProps {
  children: ReactNode;
}

interface IMasterContextData {
  logado: boolean;
  logar: (email: string, senha: string) => Promise<void>;
  master: IMaster;
  logOut():void;
  createCooperator: (
    name: string,
    email: string,
    cpf: string,
    active: boolean,
    admin: boolean,
    storeId: number,
    password: string
  ) => Promise<void>;
  
}

interface IMaster {
  id: number;
  email: string;
  name: string;
}

const MasterContext = createContext({} as IMasterContextData);

function MasterProvider({ children }: IMasterProviderProps) {
  const [logado, setLogado] = useState(false);
  const [master, setMaster] = useState({} as IMaster);

  function saveLocalStorage(cliente:IMaster,token:string){
    localStorage.setItem(masterLocalStorage, JSON.stringify(cliente));
    localStorage.setItem(tokenLocalStorage, token);
  }

  function getLocalStorage(){
    const usuario = localStorage.getItem(masterLocalStorage);
    const token = localStorage.getItem(tokenLocalStorage);
    if(usuario && token){
      setMaster(JSON.parse(usuario));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
        setLogado(true);
    }
    
   
  }



  function deleteLocalStorage(){
    localStorage.removeItem(masterLocalStorage);
    localStorage.removeItem(tokenLocalStorage);
  }

 function logOut(){
    setMaster({} as IMaster);
    setLogado(false)
    deleteLocalStorage();
  }

  useEffect(()=>{
    getLocalStorage();
  },[])

  async function logar(email: string, password: string) {
    let errorMessage = "";
    try {
      const { data } = await api.post("/master/login", { email, password });

      if (data.sucess) {
        setMaster(data.data.user);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;
        setLogado(true);
        saveLocalStorage(data.data.user,data.data.token)
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

  async function createCooperator(
    name: string,
    email: string,
    cpf: string,
    active: boolean,
    admin: boolean,
    storeId: number,
    password: string
  ) {
    try {
      const { data } = await api.post("/cooperator/", {
        name,
        cpf,
        email,
        active,
        admin,
        storeId,
        password,
      });

      console.log(data);

      if (data.sucess) {
        window.alert("Cooperador criado com sucesso");
      }
    } catch (error) {
      console.log("erro", error);

      window.alert(`Falha em criar o cooperador, ${error}`);
    }
  }

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(master);
    //window.alert(JSON.stringify(master))
  }, [master]);
  return (
    <MasterContext.Provider
      value={{
        logOut,
        logado,
        logar,
        master,
        createCooperator,
      }}
    >
      <>{children}</>
    </MasterContext.Provider>
  );
}

function useMaster() {
  const context = useContext(MasterContext);

  return context;
}

export { MasterProvider, useMaster };
