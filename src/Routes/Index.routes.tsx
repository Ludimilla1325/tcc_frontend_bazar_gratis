import React from "react";
import AppRoutes from "./App.Routes";
import { AuthRoutes } from "./Auth.Routes";
import { useCliente } from "../Hooks/cliente";

import CooperatorRoutes from "./Cooperator.Routes";
import { useCooperator } from "../Hooks/cooperator";
import MasterRoutes from "./Master.Routes";
import { useMaster } from "../Hooks/master";

export function Routes() {
   const { logado } = useCliente();
   const cooperator = useCooperator();
   const master = useMaster();
   if(cooperator.logado) return <CooperatorRoutes/>
   if(master.logado) return <MasterRoutes/>
   return logado ? <AppRoutes /> : <AuthRoutes />;
 
}
