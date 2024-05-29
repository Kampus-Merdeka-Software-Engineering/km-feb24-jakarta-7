// Fetch data dari file JSON
fetch("./data/profit_per_year.json")
  .then((response) => response.json())
  .then((data) => {
    let chartData = prepareChartData(data, "year");

    // setup
    const lineChart = new Chart(document.getElementById("lineChart"), {
      type: "line",
      data: chartData,
      options: {
        layout: {
          padding: {
            bottom : 10,
          }
      },
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Profit Growth by Year",
          },
        },
      },
    });

    // Event listener untuk dropdown sort
    document.getElementById("sortBy").addEventListener("change", (event) => {
      const sortBy = event.target.value;
      chartData = prepareChartData(data, sortBy);
      updateChart(lineChart, chartData);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Fungsi untuk mempersiapkan data chart berdasarkan metode sort
function prepareChartData(data, sortBy) {
  if (sortBy === "profit") {
    data.sort((a, b) => a.jumlah_profit - b.jumlah_profit);
    console.log('data', data)
  } else {
    data.sort((a, b) => a.Year - b.Year);
    console.log('data', data)
  }

  const years = data.map((item) => item.Year);
  const profits = data.map((item) => item.jumlah_profit);

  return {
    labels: years,
    datasets: [
      {
        label: "Total Profit",
        data: profits,
        borderColor: "#B07CFF",
        backgroundColor: "#B07CFF",
        tension: 0.1,
      },
    ],
  };
}

// Fungsi untuk mengupdate chart
function updateChart(chart, newData) {
  chart.data = newData;
  chart.update();
}
