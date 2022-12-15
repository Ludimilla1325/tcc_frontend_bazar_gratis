import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GlobalStyles from "./Styles/golbal";
import { Routes } from "./Routes/Index.routes";
import { ClienteProvider } from "./Hooks/cliente";
import { CooperatorProvider } from "./Hooks/cooperator";
import { MasterProvider } from "./Hooks/master";
import { GeralProvider } from "./Hooks/geral";
function App() {
  return (
    <div>
      <GeralProvider>
        <ClienteProvider>
          <CooperatorProvider>
            <MasterProvider>
              <GlobalStyles />
              <Routes />
            </MasterProvider>
          </CooperatorProvider>
        </ClienteProvider>
      </GeralProvider>
    </div>
  );
}

export default App;
