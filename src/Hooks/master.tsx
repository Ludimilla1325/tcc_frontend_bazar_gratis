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
  const [selectedCooperator, setSelectedCooperator] = useState({});
  const [isEditedCooperator, setIsEditedCooperator] = useState(false);

  function saveLocalStorage(cliente: IMaster, token: string) {
    localStorage.setItem(masterLocalStorage, JSON.stringify(cliente));
    localStorage.setItem(tokenLocalStorage, token);

    localStorage.setItem(tokenTimeLocalStorage, String(Date.now()));
  }

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
    setMaster({} as IMaster);
    setLogado(false);
    deleteLocalStorage();
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
        window.alert(JSON.stringify("Loja criada com sucesso"));
      } else {
        window.alert(JSON.stringify("Erro ao criar loja"));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getStore(storeId: number) {
    try {
      const { data } = await api.get(`/store/${storeId}`);
      if (data.sucess) {
        setSelectedStore(data.data);
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStore(
    storeId: number,
    name: string,
    localization: string,
    maxPoints: string
  ) {
    try {
      const { data } = await api.patch(`/store/`, {
        storeId,
        name,
        localization,
        maxPoints,
      });

      if (data.sucess) {
        window.alert(JSON.stringify("Loja atualizada com sucesso"));
      } else {
        window.alert(JSON.stringify("Problema ao atualizar a loja"));
        console.log(data);
      }
    } catch (error) {
      console.log(error);
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

      if (data.sucess) {
        window.alert("Cooperador criado com sucesso");
      }
    } catch (error) {
      console.log("erro", error);

      window.alert(`Falha em criar o cooperador, ${error}`);
    }
  }

  async function getCooperator(operatorId: number) {
    try {
      const { data } = await api.get(`/cooperator/by_id/${operatorId}`);
      if (data.sucess) {
        setSelectedCooperator(data.data);
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
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
      const { data } = await api.patch(`/cooperator/?userId=${cooperatorId}`, {
        name,
        email,
        active,
        admin,
        storeId,
      });

      if (data.sucess) {
        window.alert(JSON.stringify("Colaborador atualizada com sucesso"));
      } else {
        window.alert(JSON.stringify("Problema ao atualizar colaborador"));
        console.log(data);
      }
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
