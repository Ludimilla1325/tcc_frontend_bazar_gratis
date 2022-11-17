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
    let errorMessage = '';
    try {
      const { data } = await api.post("/master/login", { email, password });

      if (data.sucess) {
        setMaster(data.data.user);
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
