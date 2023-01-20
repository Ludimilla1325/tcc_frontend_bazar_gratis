import React from "react";
import "./overall-list.scss";
import { useCooperator } from "../../../../Hooks/cooperator";
import { BiPurchaseTagAlt } from "react-icons/bi";

const OverallList = () => {
  const { purchaseDeliveredByStoreId } = useCooperator();
  return (
    <ul className="overall-list">
      {purchaseDeliveredByStoreId.map((item, index) => (
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
