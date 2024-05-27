document.addEventListener("DOMContentLoaded", (event) => {
  const data = [114898, 65668, 56958, 15619, 8028];
  const total = data.reduce((acc, value) => acc + value, 0);
  const dataInPercent = data.map(value => ((value / total) * 100).toFixed(2));

  const ctx = document.getElementById("pieChart").getContext("2d");
  const pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        "New South Wales",
        "Victoria",
        "Queensland",
        "South Australia",
        "Tasmania",
      ],
      datasets: [
        {
          label: "Total Products",
          data: dataInPercent,
          backgroundColor: [
            "#b07cff",
            "#8d63cc",
            "#583e80",
            "#c8a3ff",
            "#dfcbff",
          ],
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
              return tooltipItem.label + ": " + tooltipItem.raw + "%";
            },
          },
        },
      },
    },
  });
});
