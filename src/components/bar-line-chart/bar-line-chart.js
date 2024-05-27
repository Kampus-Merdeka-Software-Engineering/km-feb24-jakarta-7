// Fetch data dari file JSON
fetch("../../data/total_order_by_sub_category.json")
  .then((response) => response.json())
  .then((data) => {
    // Proses data dan buat line chart
    const labels = data.map((item) => item.Sub_Category);
    const order = data.map((item) => item.Total_Order);
    const profit = data.map((item) => item.Total_Profit);


    // setup
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Total Order",
          data: order,
          backgroundColor: "#B07CFF",
          tension: 0.1,
        },
        {
          type: "line",
          label: "Total Profit",
          data: profit,
          backgroundColor: "#B07CFF",
          tension: 0.1,
        },
      ],
    };

    // config
    const chartConfig = {
      type: "bar",
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
            text: "Total Order by Sub Category Product",
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
    };

    // init
    const barLineChart = new Chart(
      document.getElementById("barLineChart"),
      chartConfig
    );
  })
  .catch((error) => console.error("Error fetching data:", error));
