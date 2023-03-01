import React, { useEffect, useState } from "react";
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
import OverallList from "../../../../components/Dashboard/per-store/overall-list/OverallList";
import RevenueList from "../../../../components/Dashboard/per-store/revenue-list/RevenueList";
import { useParams } from "react-router";
import api from "../../../../Services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardStore = () => {
  // const { pointsSolicitationByStoreId } = useCooperator();
  const [pointsSolicitation, setPointsSolicitation] = useState([]);
  const { storeId } = useParams();
  async function pointsSolicitationByStore() {
    try {
      const { data } = await api.get(
        `/dashboard/points-solicitation/percentage/${storeId}`
      );

      if (data.sucess) {
        setPointsSolicitation(data.data);
      }
    } catch (error) {}
  }

  useEffect(() => {
    pointsSolicitationByStore();
  }, []);

  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="col-8 col-md-12">
            <div className="row">
              {pointsSolicitation.map((item, index) => (
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

        <div style={{ marginTop: "2" }}>
          Top alimentos que mais são retirados
        </div>
        <div className="mb">
          <RevenueList />
        </div>
      </DashboardWrapperRight>
    </DashboardWrapper>
  );
};

export default DashboardStore;

const RevenueByMonthsChart = () => {
  //const { monthlyPurchaseByStoreId } = useCooperator();
  const { storeId } = useParams();
  const [purchaseDelivered, setPurchaseDelivered] = useState([]);
  async function purchaseDeliveredByStore() {
    try {
      const { data } = await api.get(
        `/dashboard/monthly-purchase/percentage/${storeId}`
      );

      if (data.sucess) {
        setPurchaseDelivered(data.data);
      }
    } catch (error) {}
  }

  useEffect(() => {
    purchaseDeliveredByStore();
  }, []);

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
    labels: purchaseDelivered.labels,
    datasets: [
      {
        label: "Revenue",
        data: purchaseDelivered.data,
      },
    ],
  };

  return (
    <>
      <div className="title mb outlined big">
        Gráfico por mês das cestas entregues nos últimos 365 dias
      </div>
      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};
