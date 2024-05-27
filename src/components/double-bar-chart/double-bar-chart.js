document.addEventListener("DOMContentLoaded", (event) => {
  const labels = [
    "Tires and Tubes",
    "Road Bikes",
    "Bottles and Cages",
    "Helmets",
    "Mountain Bikes",
    "Jerseys",
    "Caps",
    "Touring Bikes",
    "Fenders",
    "Gloves",
    "Cleaners",
    "Hydration Packs",
    "Shorts",
    "Socks",
    "Vests",
    "Bike Stands",
    "Bike Racks",
  ];

  const maleData = [3266, 2071, 1531, 1270, 1045, 682, 376, 400, 302, 307, 0, 0, 0, 0, 0, 0, 0];
  const femaleData = [2898, 1883, 1550, 1055, 1062, 581, 467, 379, 326, 270, 0, 0, 0, 0, 0, 0, 0];

  // Filter data yang memiliki nilai dan gabungkan yang tidak menjadi "Other"
  let filteredLabels = [];
  let filteredMaleData = [];
  let filteredFemaleData = [];
  let otherMale = 0;
  let otherFemale = 0;

  labels.forEach((label, index) => {
    if (maleData[index] !== 0 || femaleData[index] !== 0) {
      filteredLabels.push(label);
      filteredMaleData.push(maleData[index]);
      filteredFemaleData.push(femaleData[index]);
    } else {
      otherMale += maleData[index];
      otherFemale += femaleData[index];
    }
  });

  filteredLabels.push("Other");
  filteredMaleData.push(otherMale);
  filteredFemaleData.push(otherFemale);

  // Setup chart data
  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Male",
        data: filteredMaleData,
        backgroundColor: "#b07cff",
        borderWidth: 1,
      },
      {
        label: "Female",
        data: filteredFemaleData,
        backgroundColor: "#6b7dff",
        borderWidth: 1,
      },
    ],
  };

  // Config chart
  const chartConfig = {
    type: "bar",
    data: chartData,
    options: {
      maintainAspectRatio: false,
      indexAxis: "x",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Sub Category Product by Gender",
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
  };

  // Init chart
  const barChart = new Chart(
    document.getElementById("doubleBarChart"),
    chartConfig
  );
});
