import React from "react";
import "./overall-list.scss";
import { useMaster } from "../../../../Hooks/master";
import { BiPurchaseTagAlt } from "react-icons/bi";

const icons = [
  <i className="bx bx-receipt"></i>,
  <i className="bx bx-user"></i>,
  <i className="bx bx-cube"></i>,
  <i className="bx bx-dollar"></i>,
];

const OverallList = () => {
  const { purchaseDeliveredList } = useMaster();
  return (
    <ul className="overall-list">
      {purchaseDeliveredList.map((item, index) => (
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
