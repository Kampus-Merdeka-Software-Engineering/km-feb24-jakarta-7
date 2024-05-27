// Fetch data dari file JSON
fetch("./data/total_revenue_per_product_category.json")
  .then((response) => response.json())
  .then((data) => {
    // Proses data dan buat line chart
    const labels = data.map((item) => item.Product_Category);
    const revenues = data.map((item) => item.total_revenue);

    // setup
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Total Revenue",
          data: revenues,
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
    };

    // init
    const barChart = new Chart(document.getElementById("barChart"),chartConfig);
  })
  .catch((error) => console.error("Error fetching data:", error));
