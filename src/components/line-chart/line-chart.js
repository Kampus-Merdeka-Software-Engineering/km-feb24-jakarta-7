// Fetch data dari file JSON
fetch("../../data/profit_per_year.json")
  .then((response) => response.json())
  .then((data) => {
    // Proses data
    const years = data.map((item) => item.Year);
    const profits = data.map((item) => item.jumlah_profit);

    // setup
    const chartData = {
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

    // config
    const chartConfig = {
      type: "line",
      data: chartData,
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Profit Growth by Yea​r",
          },
        },
      },
    };

    // init
    const lineChart = new Chart(document.getElementById("lineChart"),chartConfig);

  })
  .catch((error) => console.error("Error fetching data:", error));
