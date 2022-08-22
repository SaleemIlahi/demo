const datectx = document.getElementById("dateChart").getContext("2d");
const weekctx = document.getElementById("weekChart").getContext("2d");
const devicdeskectx = document.getElementById("devdkChart").getContext("2d");
const devicmobctx = document.getElementById("devmbChart").getContext("2d");
const dimctx = document.getElementById("dimChart").getContext("2d");
const crectx = document.getElementById("creChart").getContext("2d");

// label values of chart
const label_dt = [
  "JUN 1",
  "JUN 2",
  "JUN 3",
  "JUN 4",
  "JUN 5",
  "JUN 6",
  "JUN 7",
];
const label_wk = ["SUN", "MON", "TUE", "WED", "FRI", "THRU", "SAT"];
const label_dim = [
  "300x250",
  "300x600",
  "320x50",
  "320x480",
  "480x320",
  "300x300",
];
const label_cre = [
  "LEADS",
  "LIVE NOW",
  "COUNTER",
  "SCORE",
  "QUATER",
  "HALFTIME",
];

// Impression values of chart
const imp_dt_vl = [1800000, 2300000, 1900000, 100000, 2300000, 110000, 200000];
const imp_wk_vl = [180000, 300000, 330000, 190000, 100000, 23000, 110000];
const imp_dim_vl = [280000, 270000, 220000, 180000, 290000, 150000];
const imp_cre_vl = [28000000, 27000000, 22000000, 18000000, 20000000, 15000000];
const imp_desk_vl = [500];
const imp_mob_vl = [400];

// CTR values of chart
const ctr_dt_vl = [0.5, 0.6, 0.3, 0.9, 0.5, 0.3, 0.4];
const ctr_wk_vl = [0.2, 0.6, 0.4, 0.3, 0.2, 0.7, 0.3];
const ctr_dim_vl = [0.5, 0.3, 0.6, 0.7, 0.2, 0.8];
const ctr_cre_vl = [0.5, 0.3, 0.9, 0.2, 0.6, 0.7];
const ctr_desk_vl = [0.6];
const ctr_mob_vl = [0.8];

// Distribution values of chart
const dist_value = dist(imp_dt_vl);
const dist_wk_vl = dist(imp_wk_vl);
const dist_dim_vl = dist(imp_dim_vl);
const dist_cre_vl = dist(imp_cre_vl);
const dist_desk_vl = dist_device(imp_desk_vl);
const dist_mob_vl = dist_device(imp_mob_vl);

// Alignment of x-axis label in bar
const labelDataAlign = {
  id: "labelDataAlign",
  afterDatasetsDraw(chart, args, options) {
    const { ctx } = chart;

    for (let i = 0; i < chart.config.data.labels.length; i++) {
      const yPosition = 10;
      const xPosition = chart.getDatasetMeta(0).data[i].y + 3;
      ctx.save();
      ctx.font = "bold 12px Roboto";
      ctx.fillText(chart.config.data.labels[i], yPosition, xPosition);
    }
  },
};

// Distribution Calculation
function dist(imp_vl) {
  let sum = 0;
  const dist_arr = [];

  // Adding imperssions
  imp_vl.forEach((element) => {
    sum += element;
  });

  imp_vl.forEach((element) => {
    const percent = (element / sum) * 100;

    if (percent < 1) {
      dist_arr.push(percent.toFixed(2));
    } else {
      dist_arr.push(Math.round(percent));
    }
  });
  return dist_arr;
}

// Sum of device imps Desktop and mobile
function device_imp(imp_dk, imp_mob) {
  const imps = imp_dk.concat(imp_mob);
  let sum = 0;
  imps.forEach((element) => {
    sum += element;
  });

  return sum;
}

// Distributin calculation of device chart
function dist_device(dev_imp) {
  const imp_sum = device_imp(imp_desk_vl, imp_mob_vl);
  const dist_arr = [];

  const percent = (dev_imp / imp_sum) * 100;

  if (percent < 1) {
    dist_arr.push(percent.toFixed(2));
  } else {
    dist_arr.push(Math.round(percent));
  }

  return dist_arr;
}

// Date Chart
const dateChart = new Chart(datectx, {
  type: "line",
  data: {
    labels: label_dt,
    datasets: [
      {
        label: "imp",
        data: imp_dt_vl,
        borderColor: "#29AFBA",
        yAxisID: "yimp",
      },
      {
        label: "CTR",
        data: ctr_dt_vl,
        borderColor: "#FBCA27",
        yAxisID: "yclk",
      },
      {
        label: "Distribution",
        data: dist_value,
        borderColor: "#F47958",
        yAxisID: "ydist",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.4,
    scales: {
      x: {
        ticks: {
          font: {
            color: "#000",
            family: "Roboto",
            size: 14,
            weight: 500,
          },
        },
      },
      yimp: {
        display: false,
        position: "left",
        grid: {
          display: false,
        },
      },
      yclk: {
        display: false,
        position: "right",
        grid: {
          display: false,
        },
      },
      ydist: {
        display: false,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 10,
        },
        position: "right",
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === "Distribution") {
              return context.dataset.label + ": " + context.parsed.y + "%";
            } else {
              return context.dataset.label + ": " + context.parsed.y;
            }
          },
        },
      },
      legend: {
        display: false,
      },
    },
  },
});

// Week Chart
const weekChart = new Chart(weekctx, {
  type: "bar",
  data: {
    labels: label_wk,
    datasets: [
      {
        label: "CTR",
        data: ctr_wk_vl,
        backgroundColor: [
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
        ],
        minBarLength: "70",
        barPercentage: 0.7,
        borderSkipped: false,
        hoverOffset: 4,
      },
      {
        label: "Distribution",
        data: dist_wk_vl,
        backgroundColor: [
          "#F47958",
          "#F47958",
          "#F47958",
          "#F47958",
          "#F47958",
          "#F47958",
        ],
        minBarLength: "120",
        barPercentage: 0.7,
        borderSkipped: false,
        hoverOffset: 4,
      },
      {
        label: "imp",
        data: imp_wk_vl,
        backgroundColor: [
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
        ],
        minBarLength: "250",
        barPercentage: 0.7,
        borderSkipped: false,
        hoverOffset: 4,
      },
    ],
  },
  plugins: [ChartDataLabels, labelDataAlign],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        display: false,
        stacked: true,
      },
      y: {
        display: false,
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === "Distribution") {
              return context.dataset.label + ": " + context.parsed.x + "%";
            } else {
              return context.dataset.label + ": " + context.parsed.x;
            }
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          if (context.dataset.label === "Distribution") {
            return value + "%";
          }
        },
        color: "#000",
        anchor: "end",
        align: "start",
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
        },
      },
      legend: {
        display: false,
      },
    },
  },
});

// Device Chart
const dedkChart = new Chart(devicdeskectx, {
  type: "doughnut",
  data: {
    labels: ["Device"],
    datasets: [
      {
        label: "imp",
        data: imp_desk_vl,
        backgroundColor: ["#29AFBA"],
        cutout: "50",
        borderRadius: "20",
        // circumference: 260
      },
      {
        label: "CTR",
        data: ctr_desk_vl,
        backgroundColor: ["#FBCA27"],
        cutout: "50",
        borderRadius: "20",
        // circumference: 200
      },
      {
        label: "Distribution",
        data: dist_desk_vl,
        backgroundColor: ["#F47958"],
        cutout: "50",
        borderRadius: "13",
        // circumference: 200
      },
    ],
  },
  plugins: [ChartDataLabels],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === "Distribution") {
              return context.dataset.label + ": " + context.parsed + "%";
            } else {
              return context.dataset.label + ": " + context.parsed;
            }
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          if (context.dataset.label === "Distribution") {
            return value + "%";
          }
        },
        color: "#000",
        anchor: "center",
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
          value: {
            color: "#000",
          },
        },
      },
      legend: {
        display: false,
      },
    },
  },
});

// Mobile Chart
const dembChart = new Chart(devicmobctx, {
  type: "doughnut",
  data: {
    labels: ["Mobile"],
    datasets: [
      {
        label: "imp",
        data: imp_mob_vl,
        backgroundColor: ["#29AFBA"],
        cutout: "50",
        borderRadius: "20",
        // circumference: 300,
      },
      {
        label: "CTR",
        data: ctr_mob_vl,
        backgroundColor: ["#FBCA27"],
        cutout: "50",
        borderRadius: "20",
        // circumference: 260
      },
      {
        label: "Distribution",
        data: dist_mob_vl,
        backgroundColor: ["#F47958"],
        cutout: "50",
        borderRadius: "20",
        // circumference: 200
      },
    ],
  },
  plugins: [ChartDataLabels],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === "Distribution") {
              return context.dataset.label + ": " + context.parsed + "%";
            } else {
              return context.dataset.label + ": " + context.parsed;
            }
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          if (context.dataset.label === "Distribution") {
            return value + "%";
          }
        },
        color: "#000",
        anchor: "center",
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
          value: {
            color: "#000",
          },
        },
      },
      legend: {
        display: false,
      },
    },
  },
});

// Dimension Chart
const dimChart = new Chart(dimctx, {
  type: "bar",
  data: {
    labels: label_dim,
    datasets: [
      {
        label: "CTR",
        data: ctr_dim_vl,
        backgroundColor: [
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
        ],
        minBarLength: "90",
        barPercentage: 0.7,
        borderSkipped: false,
        hoverOffset: 4,
      },
      {
        label: "Distribution",
        data: dist_dim_vl,
        backgroundColor: [
          "#F47958",
          "#F47958",
          "#F47958",
          "#F47958",
          "#F47958",
          "#F47958",
        ],
        minBarLength: "145",
        barPercentage: 0.7,
        borderSkipped: false,
        hoverOffset: 4,
      },
      {
        label: "imp",
        data: imp_dim_vl,
        backgroundColor: [
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
        ],
        minBarLength: "250",
        barPercentage: 0.7,
        borderSkipped: false,
        hoverOffset: 4,
      },
    ],
  },
  plugins: [ChartDataLabels, labelDataAlign],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        display: false,
        stacked: true,
      },
      y: {
        display: false,
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === "Distribution") {
              return context.dataset.label + ": " + context.parsed.x + "%";
            } else {
              return context.dataset.label + ": " + context.parsed.x;
            }
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          if (context.dataset.label === "Distribution") {
            return value + "%";
          }
        },
        color: "#000",
        anchor: "end",
        align: "start",
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
        },
      },
      legend: {
        display: false,
      },
    },
  },
});

// Creative Chart
const creChart = new Chart(crectx, {
  type: "bar",
  data: {
    labels: label_cre,
    datasets: [
      {
        label: "CTR",
        data: ctr_cre_vl,
        backgroundColor: [
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
          "#FBCA27",
        ],
        minBarLength: "100",
        barPercentage: 0.7,
        borderSkipped: false,
        hoverOffset: 4,
      },
      {
        label: "Distribution",
        data: dist_cre_vl,
        backgroundColor: [
          "#F47958",
          "#F47958",
          "#F47958",
          "#F47958",
          "#F47958",
          "#F47958",
        ],
        minBarLength: "150",
        barPercentage: 0.7,
        borderSkipped: false,
        hoverOffset: 4,
      },
      {
        label: "imp",
        data: imp_cre_vl,
        backgroundColor: [
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
          "#29AFBA",
        ],
        minBarLength: "250",
        barPercentage: 0.7,
        borderSkipped: false,
        hoverOffset: 4,
      },
    ],
  },
  plugins: [ChartDataLabels, labelDataAlign],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        display: false,
        stacked: true,
        ticks: {
          mirror: true,
        },
      },
      y: {
        display: false,
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === "Distribution") {
              return context.dataset.label + ": " + context.parsed.x + "%";
            } else {
              return context.dataset.label + ": " + context.parsed.x;
            }
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          if (context.dataset.label === "Distribution") {
            return value + "%";
          }
        },
        color: "#000",
        anchor: "end",
        align: "start",
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
        },
      },
      legend: {
        display: false,
      },
    },
  },
});
