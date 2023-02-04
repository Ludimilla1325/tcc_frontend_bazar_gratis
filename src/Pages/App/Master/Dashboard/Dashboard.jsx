import React from "react";
import { Bar } from "react-chartjs-2";
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

const Dashboard = () => {
  const { pointsSolicitationList } = useMaster();
  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="col-8 col-md-12">
            <div className="row">
              {pointsSolicitationList.map((item, index) => (
                <div
                  key={`summary-${index}`}
                  className="col-6 col-md-6 col-sm-12 mb"
                >
                  <SummaryBox item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Box>
              <RevenueByMonthsChart />
            </Box>
          </div>
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

const RevenueByMonthsChart = () => {
  const { monthlyPurchaseList } = useMaster();
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: colors.blue,
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };

  const chartData = {
    labels: monthlyPurchaseList.labels,
    datasets: [
      {
        label: "Revenue",
        data: monthlyPurchaseList.data,
      },
    ],
  };
  return (
    <>
      <div className="title mb">
        Gráfico por mês das cestas entregues nos últimos 365 dias
      </div>
      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};
