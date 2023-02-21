import React, { useEffect, useState } from "react";
import "./overall-list.scss";
import { useCooperator } from "../../../../Hooks/cooperator";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { useParams } from "react-router";
import api from "../../../../Services/api";

const OverallList = () => {
  const [purchaseDelivered, setPurchaseDelivered] = useState([]);
  const { storeId } = useParams();
  async function purchaseDeliveredByStore() {
    try {
      const { data } = await api.get(
        `/dashboard/purchase-delivered/percentage/${storeId}`
      );

      if (data.sucess) {
        setPurchaseDelivered(data.data);
      }
    } catch (error) {}
  }

  useEffect(() => {
    purchaseDeliveredByStore();
  }, []);

  //const { purchaseDeliveredByStoreId } = useCooperator();
  return (
    <ul className="overall-list">
      {purchaseDelivered.map((item, index) => (
        <li className="overall-list__item" key={`overall-${index}`}>
          <div className="overall-list__item__icon">
            <BiPurchaseTagAlt />
          </div>
          <div className="overall-list__item__info">
            <div className="title">{item.value}</div>
            <span>{item.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OverallList;
