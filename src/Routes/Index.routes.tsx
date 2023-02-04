import React from "react";
import AppRoutes from "./App.Routes";
import { AuthRoutes } from "./Auth.Routes";
import { useCliente } from "../Hooks/cliente";

import CooperatorRoutes from "./Cooperator.Routes";
import AdminRoutes from "./Admin.Routes";
import { useCooperator } from "../Hooks/cooperator";
import MasterRoutes from "./Master.Routes";
import { useMaster } from "../Hooks/master";
import ClientRoutes from "./Client.Routes";

export function Routes() {
  const { cooperator, logado } = useCooperator();
  const master = useMaster();
  const client = useCliente();

  const cooperatorLogado = logado;

  if (cooperatorLogado && cooperator.admin === false)
    return <CooperatorRoutes />;
  if (cooperatorLogado && cooperator.admin === true) return <AdminRoutes />;
  if (master.logado) return <MasterRoutes />;
  if (client.logado) return <ClientRoutes />;
  return logado ? <AppRoutes /> : <AuthRoutes />;
}
