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
  stores: Array<any>;
}

const GeralContext = createContext({} as IGeralContextData);

function GeralProvider({ children }: IGeralProviderProps) {
  const [stores, setStores] = useState([]);

  async function getStores() {
    try {
      const { data } = await api.get(`/store/`);

      if (data.sucess) {
        const stores = data.data.map((store: any) => {
          return { id: store.id, name: `${store.name}, ${store.localization}` };
        });

        setStores(stores);
        return data;
      } else {
        //MENSSAGEM DE ERRO
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStores();
  }, []);

  return (
    <GeralContext.Provider
      value={{
        stores,
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