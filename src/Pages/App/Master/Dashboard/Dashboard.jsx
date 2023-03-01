import React from "react";
import { Bar, Line } from "react-chartjs-2";
import Box from "../../../../components/Dashboard/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
  DashboardWrapperRight,
} from "../../../../components/Dashboard/dashboard-wrapper/DashboardWrapper";
import SummaryBox from "../../../../components/Dashboard/summary-box/SummaryBox";
import { colors, data } from "../../../../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMaster } from "../../../../Hooks/master";
import OverallList from "../../../../components/Dashboard/master/overall-list/OverallList";
import RevenueList from "../../../../components/Dashboard/master/revenue-list/RevenueList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const optionsPointsSolicitation = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Número de solicitações de pontos nos últimos 90 dias",
    },
  },
};

export const optionsPurchase = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Número de compras nos últimos 90 dias",
    },
  },
};

const Dashboard = () => {
  const { pointsSolicitationPerStoreList, purchasePerStoreList } = useMaster();
  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <Line options={optionsPurchase} data={purchasePerStoreList} />
        </div>
        <div className="row">
          <Bar
            options={optionsPointsSolicitation}
            data={pointsSolicitationPerStoreList}
          />
          ;
        </div>
      </DashboardWrapperMain>
      <DashboardWrapperRight>
        <div className="title mb">Cestas entregues</div>
        <div className="mb">
          <OverallList />
        </div>

        <div className="title mb">Top alimentos que mais são retirados</div>
        <div className="mb">
          <RevenueList />
        </div>
      </DashboardWrapperRight>
    </DashboardWrapper>
  );
};

export default Dashboard;
