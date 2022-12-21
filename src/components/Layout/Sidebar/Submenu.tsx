import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCliente } from "../../../Hooks/cliente";
import { useCooperator } from "../../../Hooks/cooperator";
import { useMaster } from "../../../Hooks/master";
import { SidebarItem } from "../../../models/SidebarItem";
import { app_base_url } from "../../../Utils/urls";

type SidebarLinkProps = {
  item: SidebarItem;
};

const SidebarLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  font-size: 1.125rem;
  padding: 2rem;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    background-color: deeppink;
    border-left: 4px solid #ccc;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 1rem;
`;

const DropdownLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3.5rem;
  font-size: 1.125rem;
  margin-left: 3rem;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    background-color: deeppink;
  }
`;

const Submenu: FC<SidebarLinkProps> = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const clienteHook = useCliente();
  const { cooperator } = useCooperator();
  const { master } = useMaster();
  const showSubnav = () => {
    setSubnav(!subnav);
  };
  return (
    <>
      <SidebarLink to={app_base_url + item.path} onClick={showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item?.subnav && subnav ? item?.iconOpened : item?.iconClosed}
        </div>
      </SidebarLink>
      {subnav &&
        item?.subnav?.map((subnavItem, index) => {
          return (
            <DropdownLink key={index} to={app_base_url + subnavItem.path}>
              {subnavItem.icon}
              <SidebarLabel>{subnavItem.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default Submenu;
