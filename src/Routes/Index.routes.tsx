import React from "react";
import AppRoutes from "./App.Routes";
import { AuthRoutes } from "./Auth.Routes";
import { useCliente } from "../Hooks/cliente";

import CooperatorRoutes from "./Cooperator.Routes";
import { useCooperator } from "../Hooks/cooperator";

export function Routes() {
   const { logado } = useCliente();
   const cooperator = useCooperator();
   if(cooperator.logado) return <CooperatorRoutes/>
   return logado ? <AppRoutes /> : <AuthRoutes />;
 
}
