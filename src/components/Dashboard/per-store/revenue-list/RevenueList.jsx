import React, { useEffect, useState } from "react";
import "./revenue-list.scss";
import ProgressBar from "../../progressbar/ProgressBar";
import { useCooperator } from "../../../../Hooks/cooperator";
import { useParams } from "react-router";
import api from "../../../../Services/api";

const RevenueList = () => {
  const { storeId } = useParams();
  const [topProductsList, setTopProductsList] = useState([]);
  async function topProducts() {
    try {
      const { data } = await api.get(
        `/dashboard/top-selling-products/${storeId}`
      );

      if (data.sucess) {
        setTopProductsList(data.data);
      }
    } catch (error) {}
  }

  useEffect(() => {
    topProducts();
  }, []);

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
