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
    try {
      const { data } = await api.post("/master/login", { email, password });

      if (data.sucess) {
        setMaster(data.data.user);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.data.token}`;
        setLogado(true);
      } else {
        //MENSSAGEM DE ERRO
        
      }
      console.log(data);
      window.alert(JSON.stringify(data.data));
    } catch (error) {
      console.log(error);
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
