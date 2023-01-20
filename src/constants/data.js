const data = {
  user: {
    name: "Tuatta",
  },
  summary: [
    {
      title: "Solicitação de pontos",
      subtitle: "30 dias",
      value: "$1.000",
      percent: 100,
    },
    {
      title: "Solicitação de pontos aprovados",
      subtitle: "30 dias",
      value: "3000",
      percent: 49,
    },
    {
      title: "Solicitação de pontos negados",
      subtitle: "30 dias",
      value: "$678",
      percent: 38,
    },
    // {
    //   title: "Visits",
    //   subtitle: "Total visits today",
    //   value: "2345",
    //   percent: 55,
    // },
  ],
  revenueSummary: {
    title: "Revenue",
    value: "$678",
    chartData: {
      labels: ["May", "Jun", "July", "Aug", "May", "Jun", "July", "Aug"],
      data: [300, 300, 280, 380, 200, 300, 280, 350],
    },
  },
  overall: [
    {
      value: "300K",
      title: "90 dias",
    },
    {
      value: "9.876K",
      title: "30 dias",
    },
    {
      value: "1.234K",
      title: "7 dias",
    },
  ],
  revenueByChannel: [
    {
      title: "Direct",
      value: 70,
    },
    {
      title: "External search",
      value: 40,
    },
    {
      title: "Referal",
      value: 60,
    },
    {
      title: "Social",
      value: 30,
    },
  ],
  revenueByMonths: {
    labels: [
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
    ],
    data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350],
  },
};

export default data;
