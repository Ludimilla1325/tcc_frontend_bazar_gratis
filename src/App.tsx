import React from 'react';
import logo from './logo.svg';
import './App.css';
import GlobalStyles from "./Styles/golbal";
import {Routes} from "./Routes/Index.routes"
import { ClienteProvider } from './Hooks/cliente';
function App() {
  return (
    <div className="App">
      <ClienteProvider>
      <GlobalStyles />
      <Routes/>
      </ClienteProvider>
    </div>
  );
}

export default App;
