import React from "react";
import { SidebarItem } from "../../models/SidebarItem";

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
    path: "/loja",
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
    path: "/loja",
    icon: <TbFilePlus />,
  },
  {
    title: "Historico de compras",
    path: "/loja",
    icon: <RiHistoryFill />,
    iconOpened: <AiFillCaretUp />,
    iconClosed: <AiFillCaretDown />,

    subnav: [
      { title: "Historico de compras", path: "/loja", icon: <RiHistoryFill /> },
      { title: "Historico de compras", path: "/loja", icon: <RiHistoryFill /> },
    ],
  },
];
