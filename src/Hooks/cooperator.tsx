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
  categories: any[];
  updatePassword: (oldPass: string, newPass: string) => Promise<void>;
  getProfile: () => Promise<ICooperator>;
  updateProfile: (name: string) => Promise<any>;
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
  const [categories, setCategories] = useState([]);
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
      const { data } = await api.post(`/product/${cooperator.storeId}`, {
        name: product,
        description,
        categoryId: category,
        quantity,
        value: unityValue,
        photo: image,
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

  async function getCategories() {
    try {
      const { data } = await api.get(`/category/`);

      if (data.sucess) {
        const categories = data.data.map((category: any) => {
          return { id: category.id, name: category.name };
        });

        setCategories(categories);
        return data;
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile(name: string) {
    const email = cooperator.email;
    try {
      const { data } = await api.patch("/cooperator/", {
        name,
        email,
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
    const email = cooperator.email;
    try {
      const { data } = await api.put("/cooperator/pass", {
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
    const email = cooperator.email;
    try {
      const { data } = await api.get(`/cooperator/by_email/${email}`);

      if (data.sucess) {
        console.log("data", data);
        setCooperator(data.data);
        return data;
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getProfile();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(cooperator);
  }, [cooperator]);

  useEffect(() => {
    //window.alert(JSON.stringify(cliente))
  }, [cooperator]);

  return (
    <CooperatorContext.Provider
      value={{
        logado,
        logar,
        cooperator,
        createProduct,
        categories,
        updatePassword,
        getProfile,
        updateProfile,
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
