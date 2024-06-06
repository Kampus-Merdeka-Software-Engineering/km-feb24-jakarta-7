let revenueChart;

yearOption.addEventListener("change", updateRevenueChart);

// Function to process JSON data for revenue chart
function processDataForRevenue(data, yearFilter) {
  const revenueDataFiltered = {};
  const allCategories = [...new Set(data.map(item => item.Product_Category))]; // Get all unique product categories

  if (yearFilter === "all") {
    data.reduce((acc, curr) => {
      if (!acc[curr.Product_Category]) {
        acc[curr.Product_Category] = 0;
      }
      acc[curr.Product_Category] += curr.Revenue;
      return acc;
    }, revenueDataFiltered);
  } else {
    data
      .filter((item) => item.Year == yearFilter)
      .reduce((acc, curr) => {
        if (!acc[curr.Product_Category]) {
          acc[curr.Product_Category] = 0;
        }
        acc[curr.Product_Category] += curr.Revenue;
        return acc;
      }, revenueDataFiltered);

    // Ensure all categories are present in the filtered data with 0 value if missing
    allCategories.forEach(category => {
      if (!revenueDataFiltered[category]) {
        revenueDataFiltered[category] = 0;
      }
    });
  }

  return revenueDataFiltered;
}

// Function to update revenue chart
function updateRevenueChart() {
  const yearSelected = yearOption.value;
  const dataRevenueFiltered = processDataForRevenue(rawData, yearSelected);

  // Update revenue chart with new data
  revenueChart.data.labels = Object.keys(dataRevenueFiltered);
  revenueChart.data.datasets[0].data = Object.values(dataRevenueFiltered);
  revenueChart.update(); // Update the chart with new data
}

// Fetch or load your JSON data here
fetch("./data/data.json") // Replace with your data loading method
  .then((response) => response.json())
  .then((data) => {
    rawData = data;
    const initialData = processDataForRevenue(data, "all");

    const ctx = document.getElementById("barChart").getContext("2d");
    const labels = Object.keys(initialData);
    const revenueValues = Object.values(initialData);

    revenueChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: revenueValues,
            backgroundColor: "#B07CFF",
            tension: 0.1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Revenue per Product Category",
          },
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                family: "Poppins",
              },
            },
          },
        },
      },
    });
  });
