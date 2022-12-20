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
  createProduct: (
    product: string,
    description: string,
    category: string,
    quantity: string,
    unityValue: string,
    image: string
  ) => Promise<void>;
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
    let errorMessage = "";
    try {
      const { data } = await api.post("/cooperator/login", { email, password });

      if (data.sucess) {
        setCooperator(data.data.user);
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

  async function createProduct(
    product: string,
    description: string,
    category: string,
    quantity: string,
    unityValue: string,
    image: string
  ) {
    try {
      const { data } = await api.post("/:storeId/:productId", {
        product,
        description,
        category,
        quantity,
        unityValue,
        image,
      });

      if (data.sucess) {
        window.alert(JSON.stringify("Produto criado com sucesso"));
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
    console.log(cooperator);
    //window.alert(JSON.stringify(cooperator))
  }, [cooperator]);
  return (
    <CooperatorContext.Provider
      value={{
        logado,
        logar,
        cooperator,
        createProduct,
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
