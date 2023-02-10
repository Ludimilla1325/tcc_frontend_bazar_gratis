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
export const SidebarDataClient: SidebarItem[] = [
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

export const SidebarDataOperator: SidebarItem[] = [
  {
    title: "Perfil",
    path: "/profile",
    icon: <AiOutlineUser />,
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

export const SidebarDataAdmin: SidebarItem[] = [
  {
    title: "Perfil",
    path: "/profile",
    icon: <AiOutlineUser />,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiOutlineUser />,
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
    title: "Criar Cooperador",
    path: "/create-cooperator",
    icon: <AiOutlineUser />,
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

  {
    title: "Horários disponíveis",
    path: "/appointments",
    icon: <RiHistoryFill />,
    iconOpened: <AiFillCaretUp />,
    iconClosed: <AiFillCaretDown />,
  },
];

export const SidebarDataMaster: SidebarItem[] = [
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
  {
    title: "Criar Loja",
    path: "/create-store",
    icon: <AiOutlineHome />,
  },
];
