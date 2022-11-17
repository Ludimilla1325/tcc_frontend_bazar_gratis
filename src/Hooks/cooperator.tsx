import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../Services/api";

interface ICooperatorProviderProps {
  children: ReactNode;
}

interface ICooperatorContextData {
  logado: boolean;
  logar: (email: string, senha: string) => Promise<void>;
  cooperator: ICooperator;
}

interface ICooperator {
  id: number;
  email: string;
  name: string;
  cpf: string;
  active: boolean;
  admin: boolean;
  storeId: number;
}

const CooperatorContext = createContext({} as ICooperatorContextData);

function CooperatorProvider({ children }: ICooperatorProviderProps) {
  const [logado, setLogado] = useState(false);
  const [cooperator, setCooperator] = useState({} as ICooperator);
  async function logar(email: string, password: string) {
    let errorMessage = '';
    try {
      const { data } = await api.post("/cooperator/login", { email, password });

      if (data.sucess) {
        setCooperator(data.data.user);
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
    console.log(cooperator);
    //window.alert(JSON.stringify(cooperator))
  }, [cooperator]);
  return (
    <CooperatorContext.Provider
      value={{
        logado,
        logar,
        cooperator,
      }}
    >
      <>{children}</>
    </CooperatorContext.Provider>
  );
}

function useCooperator() {
  const context = useContext(CooperatorContext);

  return context;
}

export { CooperatorProvider, useCooperator };
