import React, { useEffect, useState } from "react";
import { useCooperator } from "../../../../Hooks/cooperator";
import api from "../../../../Services/api";
export interface IProduct {
  id: number;
  name: string;
  photo: string;
  categoryId: number;
  value: number;
  quantity: number;
  storeId: number;
  categoria: string;
}
export const Products = () => {
  const [products, setProducts] = useState({} as IProduct[]);
  const { cooperator } = useCooperator();
  async function handleData() {
    try {
      const { data } = await api.get(`/product/${cooperator.storeId}`);
      if (data.sucess) {
        setProducts(data.data);
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
    if (products && products.length > 0) {
      return products.map((item) => {
        return (
          <div>
            <img src={item.photo} />
            <span>{item.name}</span>

            <span>{item.name}</span>
            <div>
              <span>Quantidade: {item.quantity}</span>
              <span>Valor: {item.value}</span>
            </div>
          </div>
        );
      });
    }
  }

  return (
    <div>
      <h1>Produtos</h1>
      {renderData()}
    </div>
  );
};
