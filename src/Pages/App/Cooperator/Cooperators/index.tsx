import React, { useEffect, useState } from "react";
import { useCooperator } from "../../../../Hooks/cooperator";
import api from "../../../../Services/api";

export interface ICooperator {
  id: number;
  name: string;
  email: string;
  cpf: string;
  active: boolean;
  admin: boolean;
  storeId: number;
}
export const Cooperators = () => {
  const [cooperators, setCooperators] = useState({} as ICooperator[]);
  const { cooperator } = useCooperator();
  async function handleData() {
    try {
      const { data } = await api.get(`/cooperator/loja/${cooperator.storeId}`);
      if (data.sucess) {
        window.alert(data.data);
        setCooperators(data.data);
      } else {
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleData();
  }, []);

  function renderData() {
    if (cooperators && cooperators.length > 0) {
      return cooperators.map((item) => {
        return (
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.cpf}</td>
            <td>{item.active ? "A" : "I"}</td>
          </tr>
        );
      });
    }
  }

  return (
    <div>
      <table>
          <tr>
              <th>CÓDIGO</th>
              <th>NOME</th>
              <th>EMAIL</th>
              <th>CPF</th>
              <th>ATIVO</th>
              
          </tr>
          {renderData()}
          </table>
    </div>
  );
};
