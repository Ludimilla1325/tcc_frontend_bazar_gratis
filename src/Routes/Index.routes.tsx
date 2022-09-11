import React from "react";
import AppRoutes from "./App.Routes";
import { AuthRoutes } from "./Auth.Routes";
import { useCliente } from "../Hooks/cliente";
export function Routes() {
   const { logado } = useCliente();
   return logado ? <AppRoutes /> : <AuthRoutes />;
 
}
