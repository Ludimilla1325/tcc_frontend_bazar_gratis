import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../Services/api";

interface IGeralProviderProps {
  children: ReactNode;
}

interface IGeralContextData {
  storeList: Array<any>;
  getStores: any;
}

const GeralContext = createContext({} as IGeralContextData);

function GeralProvider({ children }: IGeralProviderProps) {
  const [storeList, setStoreList] = useState([]);

  async function getStores() {
    try {
      const { data } = await api.get(`/store/`);

      if (data.sucess) {
        const storeList = data.data.map((store: any) => {
          return { id: store.id, name: `${store.name}, ${store.localization}` };
        });
        setStoreList(storeList);

        return data;
      }
    } catch (error) {}
  }
  useEffect(() => {
    getStores();
  }, []);

  return (
    <GeralContext.Provider
      value={{
        storeList,
        getStores,
      }}
    >
      <>{children}</>
    </GeralContext.Provider>
  );
}

function useGeral() {
  const context = useContext(GeralContext);

  return context;
}

export { GeralProvider, useGeral };
