import React from "react";
import AppRoutes from "./App.Routes";
import { AuthRoutes } from "./Auth.Routes";
import { useCliente } from "../Hooks/cliente";

import CooperatorRoutes from "./Cooperator.Routes";
import { useCooperator } from "../Hooks/cooperator";
import MasterRoutes from "./Master.Routes";
import { useMaster } from "../Hooks/master";
import ClientRoutes from "./Client.Routes";

export function Routes() {
  const { logado } = useCliente();
  const cooperator = useCooperator();
  const master = useMaster();
  const client = useCliente();
  console.log("Client", client);

  if (cooperator.logado) return <CooperatorRoutes />;
  if (master.logado) return <MasterRoutes />;
  if (client.logado) return <ClientRoutes />;
  return logado ? <AppRoutes /> : <AuthRoutes />;
}
