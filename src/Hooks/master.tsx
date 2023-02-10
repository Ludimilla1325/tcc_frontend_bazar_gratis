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
  masterLocalStorage,
  tokenLocalStorage,
  tokenTimeLocalStorage,
} from "../Utils/localStorage";
import { useGeral } from "./geral";

interface IMasterProviderProps {
  children: ReactNode;
}

interface IMasterContextData {
  logado: boolean;
  logar: (email: string, senha: string) => Promise<void>;
  master: IMaster;
  logOut(): void;
  createCooperator: (
    name: string,
    email: string,
    cpf: string,
    active: boolean,
    admin: boolean,
    storeId: number,
    password: string
  ) => Promise<void>;
  createStore: (
    name: string,
    localization: string,
    maxPoints: string
  ) => Promise<void>;
  getStore: (storeId: number) => Promise<void>;
  updateStore: (
    storeId: number,
    name: string,
    localization: string,
    maxPoints: string
  ) => Promise<void>;
  selectedStore: any;
  setSelectedStore: any;
  isEditedStore: any;
  setIsEditedStore: any;
  getCooperator: (operatorId: number) => Promise<void>;
  updateCooperator: (
    cooperatorId: string,
    name: string,
    email: string,
    active: boolean,
    admin: boolean,
    storeId: number
  ) => Promise<void>;
  selectedCooperator: any;
  setSelectedCooperator: any;
  isEditedCooperator: any;
  setIsEditedCooperator: any;
  pointsSolicitationList: any;
  purchaseDeliveredList: any;
  monthlyPurchaseList: any;
  totalNumberClient: any;
  topProductsList: any;
  deleteStore: any;
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
  const [selectedStore, setSelectedStore] = useState({});
  const [isEditedStore, setIsEditedStore] = useState(false);
  const [selectedCooperator, setSelectedCooperator] = useState({ id: 0 });
  const [isEditedCooperator, setIsEditedCooperator] = useState(0);
  const [pointsSolicitationList, setPointsSolicitation] = useState([]);
  const [purchaseDeliveredList, setPurchaseDelivered] = useState([]);
  const [monthlyPurchaseList, setMonthlyPurchase] = useState([]);
  const [totalNumberClient, setTotalNumClient] = useState(0);
  const [topProductsList, setTopProductsList] = useState([]);
  function saveLocalStorage(cliente: IMaster, token: string) {
    localStorage.setItem(masterLocalStorage, JSON.stringify(cliente));
    localStorage.setItem(tokenLocalStorage, token);

    localStorage.setItem(tokenTimeLocalStorage, String(Date.now()));
  }

  const { enqueueSnackbar } = useSnackbar();

  function getLocalStorage() {
    const usuario = localStorage.getItem(masterLocalStorage);
    const token = localStorage.getItem(tokenLocalStorage);
    const time = localStorage.getItem(tokenTimeLocalStorage);
    if (usuario && token && time) {
      if ((Date.now() - Number(time)) * 0.001 >= 3600) {
        deleteLocalStorage();
      } else {
        setMaster(JSON.parse(usuario));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setLogado(true);
      }
    }
  }

  function deleteLocalStorage() {
    localStorage.removeItem(masterLocalStorage);
    localStorage.removeItem(tokenLocalStorage);
  }

  function logOut() {
    deleteLocalStorage();
    setMaster({} as IMaster);
    setLogado(false);
  }

  async function createStore(
    name: string,
    localization: string,
    maxPoints: string
  ) {
    try {
      const { data } = await api.post(`/store/`, {
        name,
        localization,
        maxPoints,
      });

      if (data.sucess) {
        enqueueSnackbar(`Loja criada com sucesso`, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar("Erro ao cadastrar loja", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  async function getStore(storeId: number) {
    try {
      const { data } = await api.get(`/store/${storeId}`);
      if (data.sucess) {
        setSelectedStore(data.data);
      }
    } catch (error) {}
  }

  async function updateStore(
    storeId: number,
    name: string,
    localization: string,
    maxPoints: string
  ) {
    try {
      const { data } = await api.put(`/store/${master.id}`, {
        id: isEditedStore,
        name,
        localization,
        maxPoints,
      });

      if (data.sucess) {
        enqueueSnackbar("Loja atualizada com sucesso", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar("Problema ao atualizar a loja", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  useEffect(() => {
    getLocalStorage();
  }, []);

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
        saveLocalStorage(data.data.user, data.data.token);
      } else {
        errorMessage = data.message;
      }
    } catch (error) {
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

      if (data.sucess) {
        enqueueSnackbar("Cooperador criado com sucesso", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar(`Falha em cadastrar o cooperador`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  async function getCooperator(operatorId: number) {
    try {
      const { data } = await api.get(`/cooperator/by_id/${operatorId}`);
      if (data.sucess) {
        setSelectedCooperator(data.data);
      }
    } catch (error) {}
  }

  async function updateCooperator(
    cooperatorId: string,
    name: string,
    email: string,
    active: boolean,
    admin: boolean,
    storeId: number
  ) {
    try {
      const { data } = await api.put(`/cooperator/`, {
        id: cooperatorId,
        name,
        active,
        admin,
        storeId,
      });

      if (data.sucess) {
        enqueueSnackbar("Colaborador atualizada com sucesso", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar("Erro ao atualizar colaborador", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  ///////////////

  async function pointsSolicitation() {
    try {
      const { data } = await api.get(
        `/dashboard/points-solicitation/percentage/`
      );

      if (data.sucess) {
        setPointsSolicitation(data.data);
      }
    } catch (error) {}
  }

  async function purchaseDelivered() {
    try {
      const { data } = await api.get(
        `/dashboard/purchase-delivered/percentage/`
      );

      if (data.sucess) {
        setPurchaseDelivered(data.data);
      }
    } catch (error) {}
  }

  async function monthlyPurchase() {
    try {
      const { data } = await api.get(`/dashboard/monthly-purchase/percentage/`);

      if (data.sucess) {
        setMonthlyPurchase(data.data);
      }
    } catch (error) {}
  }

  async function totalNumClient() {
    try {
      const { data } = await api.get(`/dashboard/total-number-client/`);

      if (data.sucess) {
        setTotalNumClient(+data.data);
      }
    } catch (error) {}
  }

  async function topProducts() {
    try {
      const { data } = await api.get(`/dashboard/top-selling-products/`);

      if (data.sucess) {
        setTopProductsList(data.data);
      }
    } catch (error) {}
  }

  async function deleteStore(storeId: number) {
    try {
      const { data } = await api.delete(`/store/${storeId}/`);

      if (data.sucess) {
        enqueueSnackbar("Apagado com sucesso", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      } else {
        enqueueSnackbar(`${data.message}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log(error);

      enqueueSnackbar("Erro ao apagar", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  useEffect(() => {}, []);

  useEffect(() => {
    pointsSolicitation();
    purchaseDelivered();
    monthlyPurchase();
    totalNumClient();
    topProducts();
  }, [master]);
  return (
    <MasterContext.Provider
      value={{
        logOut,
        logado,
        logar,
        master,
        createStore,
        getStore,
        updateStore,
        selectedStore,
        setSelectedStore,
        isEditedStore,
        setIsEditedStore,
        createCooperator,
        getCooperator,
        updateCooperator,
        selectedCooperator,
        setSelectedCooperator,
        isEditedCooperator,
        setIsEditedCooperator,
        pointsSolicitationList,
        purchaseDeliveredList,
        monthlyPurchaseList,
        totalNumberClient,
        topProductsList,
        deleteStore,
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
