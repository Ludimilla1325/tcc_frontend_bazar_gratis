import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../Services/api";

interface IMasterProviderProps {
  children: ReactNode;
}

interface IMasterContextData {
  logado: boolean;
  logar: (email: string, senha: string) => Promise<void>;
  master: IMaster;
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
