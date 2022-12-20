import React from "react";
import { SidebarItem } from "../../../models/SidebarItem";

import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";

import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { TbFilePlus } from "react-icons/tb";
import { RiHistoryFill } from "react-icons/ri";
export const SidebarData: SidebarItem[] = [
  {
    title: "Perfil",
    path: "/profile",
    icon: <AiOutlineUser />,
  },
  {
    title: "Loja",
    path: "/loja",
    icon: <AiOutlineHome />,
  },
  {
    title: "Carinho",
    path: "/loja",
    icon: <MdOutlineLocalGroceryStore />,
  },
  {
    title: "Solicitar pontos",
    path: "/pointsSolicitation",
    icon: <TbFilePlus />,
  },
  {
    title: "Historico de compras",
    path: "/historico-de-compras",
    icon: <RiHistoryFill />,
  },
];

export const SidebarDataCooperator: SidebarItem[] = [
  {
    title: "Perfil",
    path: "/perfil",
    icon: <AiOutlineUser />,
  },
  {
    title: "Loja",
    path: "/loja",
    icon: <AiOutlineHome />,
  },
  {
    title: "Produtos",
    path: "/produtos",
    icon: <MdOutlineLocalGroceryStore />,
  },
  {
    title: "Criar Produtos",
    path: "/create-products",
    icon: <MdOutlineLocalGroceryStore />,
  },
  {
    title: "Colaboradores",
    path: "/colaboradores",
    icon: <TbFilePlus />,
  },
  {
    title: "Solicitação de Pontos",
    path: "/points-solicitation",
    icon: <TbFilePlus />,
  },
  {
    title: "Pedidos",
    path: "/pedidos",
    icon: <RiHistoryFill />,
    iconOpened: <AiFillCaretUp />,
    iconClosed: <AiFillCaretDown />,
  },
];

export const SidebarMaster: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiOutlineUser />,
  },
  {
    title: "Criar Cooperador",
    path: "/create-cooperator",
    icon: <AiOutlineUser />,
  },
  {
    title: "Lojas",
    path: "/lojas",
    icon: <AiOutlineHome />,
  },
];
