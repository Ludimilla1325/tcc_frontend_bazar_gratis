import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GlobalStyles from "./Styles/golbal";
import { Routes } from "./Routes/Index.routes";
import { ClienteProvider } from "./Hooks/cliente";
import { CooperatorProvider } from "./Hooks/cooperator";
function App() {
  return (
    <div className="App">
      <ClienteProvider>
        <CooperatorProvider>
          <GlobalStyles />
          <Routes />
        </CooperatorProvider>
      </ClienteProvider>
    </div>
  );
}

export default App;
