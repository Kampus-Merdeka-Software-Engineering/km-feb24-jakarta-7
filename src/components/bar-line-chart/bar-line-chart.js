let orderChart;
let rawDataOrder; // Separate rawData variable

const yearOptionOrder = document.getElementById("year"); // Separate yearOption variable
yearOptionOrder.addEventListener("change", updateOrderChart);

// Function to process JSON data for revenue chart
function processOrderData(data, yearFilter) {
  const totalOrders = {};
  const totalProfits = {};

  data.forEach((item) => {
    if (yearFilter === "all" || item.Year == yearFilter) {
      const subCategory = item.Sub_Category;

      // Total Orders
      if (!totalOrders[subCategory]) {
        totalOrders[subCategory] = 0;
      }
      totalOrders[subCategory]++;

      // Total Profits
      if (!totalProfits[subCategory]) {
        totalProfits[subCategory] = 0;
      }
      totalProfits[subCategory] += item.Profit;
    }
  });

  // Sort data by value (total orders or total profits)
  const sortedOrders = Object.entries(totalOrders).sort((a, b) => b[1] - a[1]);
  const sortedProfits = Object.entries(totalProfits).sort(
    (a, b) => b[1] - a[1]
  );

  // Get top 10 and sum the rest as "Other"
  const top10Orders = sortedOrders.slice(0, 10);
  const otherOrders = sortedOrders
    .slice(10)
    .reduce((acc, curr) => acc + curr[1], 0);

  const top10Profits = sortedProfits.slice(0, 10);
  const otherProfits = sortedProfits
    .slice(10)
    .reduce((acc, curr) => acc + curr[1], 0);

  if (otherOrders > 0) {
    top10Orders.push(["Other", otherOrders]);
  }

  if (otherProfits > 0) {
    top10Profits.push(["Other", otherProfits]);
  }

  // Convert sorted data back to object format
  const sortedTotalOrders = Object.fromEntries(top10Orders);
  const sortedTotalProfits = Object.fromEntries(top10Profits);

  return { totalOrders: sortedTotalOrders, totalProfits: sortedTotalProfits };
}

// Function to update revenue chart
function updateOrderChart() {
  const yearSelected = yearOptionOrder.value;
  const { totalOrders, totalProfits } = processOrderData(
    rawDataOrder,
    yearSelected
  );

  const subCategories = Object.keys(totalOrders);

  orderChart.data.labels = subCategories;
  orderChart.data.datasets[0].data = Object.values(totalOrders);
  orderChart.data.datasets[1].data = Object.values(totalProfits);

  orderChart.update(); // Update the chart with new data
}

// Function to format numbers with "jt" or "rb"
function formatNumber(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return value.toString();
}

// Fetch or load your JSON data here
fetch("../../../data/data.json") // Replace with your data loading method
  .then((response) => response.json())
  .then((data) => {
    rawDataOrder = data;

    // Initial data processing
    const { totalOrders, totalProfits } = processOrderData(data, "all");
    const subCategories = Object.keys(totalOrders);

    const ctx = document.getElementById("barLineChart").getContext("2d");
    orderChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: subCategories,
        datasets: [
          {
            label: "Total Orders",
            data: Object.values(totalOrders),
            backgroundColor: "rgb(176, 124, 255, 0.7)",
            borderWidth: 1,
          },
          {
            label: "Total Profits",
            data: Object.values(totalProfits),
            borderColor: "#6b7dff",
            backgroundColor: "#6b7dff",
            borderWidth: 2,
            tension: 0.4,
            type: "line",
            yAxisID: "profitsAxis",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Total Orders",
            },
          },
          profitsAxis: {
            position: "right",
            beginAtZero: true,
            title: {
              display: true,
              text: "Total Profits",
            },
            ticks: {
              callback: function (value) {
                // Format numbers to add "jt" or "rb" suffix
                return formatNumber(value);
              },
            },
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Total Order by Sub Category Product",
          },
          legend: {
            labels: {
              font: {
                family: "Poppins",
              },
            },
          },
        },
      },
    });

    // Initial chart rendering
    orderChart.update();
  });
