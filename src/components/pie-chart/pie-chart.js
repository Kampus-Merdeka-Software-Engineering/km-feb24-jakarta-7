let salesData;
let pieChart;

yearDropdown.addEventListener("change", updatePieChart);
fetchSalesData();

function fetchSalesData() {
  fetch("./data/data.json")
    .then((response) => response.json())
    .then((data) => {
      salesData = data;
      updatePieChart();
    })
    .catch((error) => {
      console.error("Error fetching sales data:", error);
    });
}

function updatePieChart() {
  const selectedYear = yearDropdown.value;
  const filteredProfitData = processData(salesData, selectedYear);

  if (!pieChart) {
    createPieChart(filteredProfitData);
  } else {
    updateChartData(filteredProfitData, selectedYear);
  }
}

function processData(data, yearFilter) {
  const totalOrderQuantity = data.reduce((total, item) => {
    if (yearFilter === "all" || item.Year == yearFilter) {
      return total + item.Order_Quantity;
    } else {
      return total;
    }
  }, 0);

  const profitDataFiltered = {};

  if (yearFilter === "all") {
    data.forEach((item) => {
      if (!profitDataFiltered[item.State]) {
        profitDataFiltered[item.State] = 0;
      }
      profitDataFiltered[item.State] += item.Order_Quantity;
    });
  } else {
    data
      .filter((item) => item.Year == yearFilter)
      .forEach((item) => {
        if (!profitDataFiltered[item.State]) {
          profitDataFiltered[item.State] = 0;
        }
        profitDataFiltered[item.State] += item.Order_Quantity;
      });
  }

  // Calculate percentages
  for (const state in profitDataFiltered) {
    profitDataFiltered[state] =
      (profitDataFiltered[state] / totalOrderQuantity) * 100;
  }

  return profitDataFiltered;
}

function createPieChart(data) {
  const ctx = document.getElementById("pieChart").getContext("2d");
  const labels = Object.keys(data);
  const profitValues = Object.values(data);

  pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Order Quantity (%)",
          data: profitValues,
          backgroundColor: [
            "#b07cff",
            "#8d63cc",
            "#583e80",
            "#c8a3ff",
            "#dfcbff",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: 0,
      },
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Order Quantity by State",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const percentage = parseFloat(tooltipItem.raw);
              return tooltipItem.label + ": " + Math.round(percentage) + "%";
            },
          },
        },
      },
    },
  });
}

function updateChartData(data, selectedYear) {
  pieChart.data.labels = Object.keys(data);
  pieChart.data.datasets[0].data = Object.values(data);

  let chartTitle = "Order Quantity by State";
  if (selectedYear !== "all") {
    chartTitle += "Year " + selectedYear;
  }
  pieChart.options.plugins.title.text = chartTitle;

  pieChart.update();
}