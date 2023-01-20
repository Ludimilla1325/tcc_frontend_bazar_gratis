import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../Services/api";
import {
  operatorLocalStorage,
  tokenLocalStorage,
  tokenTimeLocalStorage,
} from "../Utils/localStorage";

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
  updateProfile: (name: string) => Promise<any>;
  updatePassword: (oldPass: string, newPass: string) => Promise<void>;
  setCooperator: any;
  categories: any[];
  getProduct: (productId: number) => Promise<void>;
  updateProduct: (
    productId: number,
    product: string,
    description: string,
    category: string,
    quantity: string,
    unityValue: string,
    image: string
  ) => Promise<void>;
  productSelected: any;
  isEditProduct: any;
  setIsEditProduct: any;
  logOut(): void;
  pointsSolicitationByStoreId: any;
  purchaseDeliveredByStoreId: any;
  monthlyPurchaseByStoreId: any;
  totalNumClientStoreId: any;
  topProductsList: any;
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
  const [productSelected, setProductSelected] = useState({});
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [pointsSolicitationByStoreId, setPointsSolicitationByStoreId] =
    useState([]);
  const [purchaseDeliveredByStoreId, setPurchaseDeliveredByStoreId] = useState(
    []
  );
  const [monthlyPurchaseByStoreId, setMonthlyPurchaseByStoreId] = useState([]);
  const [totalNumClientStoreId, setTotalNumClientByStoreId] = useState(0);

  const [topProductsList, setTopProductsList] = useState([]);

  function saveLocalStorage(cliente: ICooperator, token: string) {
    localStorage.setItem(operatorLocalStorage, JSON.stringify(cliente));
    localStorage.setItem(tokenLocalStorage, token);

    localStorage.setItem(tokenTimeLocalStorage, String(Date.now()));
  }

  function getLocalStorage() {
    const usuario = localStorage.getItem(operatorLocalStorage);
    const token = localStorage.getItem(tokenLocalStorage);
    const time = localStorage.getItem(tokenTimeLocalStorage);
    if (usuario && token && time) {
      if ((Date.now() - Number(time)) * 0.001 >= 3600) {
        deleteLocalStorage();
      } else {
        setCooperator(JSON.parse(usuario));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setLogado(true);
      }
    }
  }

  function deleteLocalStorage() {
    localStorage.removeItem(operatorLocalStorage);
    localStorage.removeItem(tokenLocalStorage);
  }

  function logOut() {
    setCooperator({} as ICooperator);
    setLogado(false);
    deleteLocalStorage();
  }

  useEffect(() => {
    getLocalStorage();
  }, []);

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
        saveLocalStorage(data.data.user, data.data.token);
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
    } catch (error) {
      console.log(error);
    }
  }

  async function getProduct(productId: number) {
    try {
      const { data } = await api.get(
        `/product/${cooperator.storeId}/${productId}`
      );

      console.log("product", data, productId);

      if (data.sucess) {
        setProductSelected(data.data);
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProduct(
    productId: number,
    product: string,
    description: string,
    category: string,
    quantity: string,
    unityValue: string,
    image: string
  ) {
    try {
      const { data } = await api.put(
        `/product/${cooperator.storeId}/${productId}`,
        {
          name: product,
          description,
          categoryId: category,
          quantity,
          value: unityValue,
          photo: image,
        }
      );

      if (data.sucess) {
        window.alert(JSON.stringify("Produto atualizado com sucesso"));
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
      window.alert(JSON.stringify(data.data));
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile(name: string) {
    const id = cooperator.id;
    try {
      const { data } = await api.patch("/cooperator/", {
        name,
        id,
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

  ////////////////

  async function pointsSolicitationByStore() {
    try {
      const { data } = await api.get(
        `/dashboard/points-solicitation/percentage/${cooperator.storeId}`
      );

      console.log("dddddd", data);

      if (data.sucess) {
        setPointsSolicitationByStoreId(data.data);
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function purchaseDeliveredByStore() {
    try {
      const { data } = await api.get(
        `/dashboard/purchase-delivered/percentage/${cooperator.storeId}`
      );

      if (data.sucess) {
        setPurchaseDeliveredByStoreId(data.data);
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function monthlyPurchaseByStore() {
    console.log("sera", cooperator.storeId);

    try {
      const { data } = await api.get(
        `/dashboard/monthly-purchase/percentage/${cooperator.storeId}`
      );

      console.log("1erijenrk", data.data);

      if (data.sucess) {
        setMonthlyPurchaseByStoreId(data.data);
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function totalNumClient() {
    try {
      const { data } = await api.get(
        `/dashboard/total-number-client/${cooperator.storeId}`
      );

      if (data.sucess) {
        setTotalNumClientByStoreId(+data.data);
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function topProducts() {
    try {
      const { data } = await api.get(`/dashboard/top-selling-products/`);

      if (data.sucess) {
        setTopProductsList(data.data);
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
    pointsSolicitationByStore();
    purchaseDeliveredByStore();
    monthlyPurchaseByStore();
    totalNumClient();
    topProducts();
  }, [cooperator]);

  // useEffect(() => {
  //   console.log(cooperator);
  //   //window.alert(JSON.stringify(cooperator))
  // }, [cooperator]);
  return (
    <CooperatorContext.Provider
      value={{
        logado,
        logar,
        cooperator,
        createProduct,
        updateProfile,
        updatePassword,
        setCooperator,
        categories,
        getProduct,
        updateProduct,
        productSelected,
        isEditProduct,
        setIsEditProduct,
        logOut,
        pointsSolicitationByStoreId,
        purchaseDeliveredByStoreId,
        monthlyPurchaseByStoreId,
        totalNumClientStoreId,
        topProductsList,
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
