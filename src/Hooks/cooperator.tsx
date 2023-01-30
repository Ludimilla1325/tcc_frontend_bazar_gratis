import { useSnackbar } from "notistack";
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
    image: any
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
  setProductSelected: any;
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
  const [isEditProduct, setIsEditProduct] = useState(0);
  const [pointsSolicitationByStoreId, setPointsSolicitationByStoreId] =
    useState([]);
  const [purchaseDeliveredByStoreId, setPurchaseDeliveredByStoreId] = useState(
    []
  );
  const [monthlyPurchaseByStoreId, setMonthlyPurchaseByStoreId] = useState([]);
  const [totalNumClientStoreId, setTotalNumClientByStoreId] = useState(0);
  const [topProductsList, setTopProductsList] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

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
    } catch (error) {
      enqueueSnackbar("Não foi possível realizar o login!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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
    image: any
  ) {
    const formData = new FormData();
    formData.append("file", image);
     formData.append("name", product);
     formData.append("categoryId", category);
     formData.append("value", unityValue);
     formData.append("description", description);
     
     formData.append("quantity", quantity);
     formData.append("storeId", String(cooperator.storeId));
    try {
      const { data } = await api.post(`/product/${cooperator.storeId}`, formData);

      if (data.sucess) {
        enqueueSnackbar("Produto criado com sucesso", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar(`Erro ao cadatrar o produto`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  async function getProduct(productId: number) {
    try {
      const { data } = await api.get(
        `/product/${cooperator.storeId}/${productId}`
      );

      if (data.sucess) {
        setProductSelected(data.data);
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
      const formData = new FormData();
    formData.append("file", image);
     formData.append("name", product);
     formData.append("categoryId", category);
     formData.append("value", unityValue);
     formData.append("description", description);
     formData.append("productId", String(productId));
     
     formData.append("quantity", quantity);
     formData.append("storeId", String(cooperator.storeId));
      const { data } = await api.put(
        `/product/${cooperator.storeId}/${productId}`,
        formData
      );

      if (data.sucess) {
        enqueueSnackbar("Produto atualizado com sucesso", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar(`Erro ao atualizar produto`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  async function updateProfile(name: string) {
    const id = cooperator.id;
    try {
      const { data } = await api.put("/cooperator/", {
        name,
        id,
      });

      if (data.sucess) {
        enqueueSnackbar(`Perfil atualizado com sucesso`, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar(`Erro ao atualizar o perfil`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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
        enqueueSnackbar(`Senha atualizada com sucesso`, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar(`Problema ao atualizar a senha`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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

      if (data.sucess) {
        setPointsSolicitationByStoreId(data.data);
      } else {
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
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function monthlyPurchaseByStore() {
    try {
      const { data } = await api.get(
        `/dashboard/monthly-purchase/percentage/${cooperator.storeId}`
      );

      if (data.sucess) {
        setMonthlyPurchaseByStoreId(data.data);
      } else {
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
        setProductSelected,
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
