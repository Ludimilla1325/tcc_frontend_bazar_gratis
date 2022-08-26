import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  
 
  
  
  interface IClienteProviderProps {
    children: ReactNode;
  }
  
  interface IClienteContextData{
    logado:boolean;
    logar:()=>void;

  }

  
  const ClienteContext = createContext({} as IClienteContextData);
  
  function ClienteProvider({ children }: IClienteProviderProps) {
    const [logado, setLogado] = useState(false);
  function logar(){
    setLogado(true);
  }
    return (
      <ClienteContext.Provider
        value={{
         logado,
         logar
        }}
      >
        <>{children}</>
      </ClienteContext.Provider>
    );
  }
  
  function useCliente() {
    const context = useContext(ClienteContext);
  
    return context;
  }
  
  export { ClienteProvider, useCliente };