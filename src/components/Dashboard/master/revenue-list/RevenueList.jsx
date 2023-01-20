import React from "react";
import "./revenue-list.scss";
import { useMaster } from "../../../../Hooks/master";
import ProgressBar from "../../progressbar/ProgressBar";

const RevenueList = () => {
  const { topProductsList } = useMaster();
  return (
    <ul className="revenue-list">
      {topProductsList.map((item, index) => (
        <li className="revenue-list__item" key={`revenue-${index}`}>
          <div className="revenue-list__item__title">
            {item.title}
            <span
              className={`${item.value < 50 ? "txt-success" : "txt-danger"}`}
            >
              {item.value}%
            </span>
          </div>
          <div>
            <ProgressBar value={item.value} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RevenueList;
