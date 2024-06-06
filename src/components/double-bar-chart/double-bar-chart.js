let revenueByGenderChart;
const yearDropdown = document.getElementById("year");
yearDropdown.addEventListener("change", updateRevenueByGenderChart);

// Function to process JSON data for revenue chart by gender
function processRevenueDataByGender(data, yearFilter) {
  const totalRevenueByGender = {
    Female: {},
    Male: {}
  };

  data.forEach((item) => {
    if (yearFilter === "all" || item.Year == yearFilter) {
      const gender = item.Customer_Gender;
      if (!totalRevenueByGender[gender][item.Sub_Category]) {
        totalRevenueByGender[gender][item.Sub_Category] = 0;
      }
      totalRevenueByGender[gender][item.Sub_Category] += item.Revenue;
    }
  });

  // Calculate total revenue per sub category
  const totalRevenuePerSubCategory = {};
  Object.keys(totalRevenueByGender.Female).forEach((subCategory) => {
    totalRevenuePerSubCategory[subCategory] =
      (totalRevenueByGender.Female[subCategory] || 0) +
      (totalRevenueByGender.Male[subCategory] || 0);
  });

  // Sort sub categories by total revenue and get top 10
  const sortedSubCategories = Object.keys(totalRevenuePerSubCategory).sort(
    (a, b) => totalRevenuePerSubCategory[b] - totalRevenuePerSubCategory[a]
  );
  const topSubCategories = sortedSubCategories.slice(0, 10);

  // Combine other sub categories into "Other"
  const finalRevenueByGender = {
    Female: { Other: 0 },
    Male: { Other: 0 }
  };
  topSubCategories.forEach((subCategory) => {
    finalRevenueByGender.Female[subCategory] =
      totalRevenueByGender.Female[subCategory] || 0;
    finalRevenueByGender.Male[subCategory] =
      totalRevenueByGender.Male[subCategory] || 0;
  });

  sortedSubCategories.slice(10).forEach((subCategory) => {
    finalRevenueByGender.Female.Other +=
      totalRevenueByGender.Female[subCategory] || 0;
    finalRevenueByGender.Male.Other +=
      totalRevenueByGender.Male[subCategory] || 0;
  });

  // Ensure "Other" is at the end
  const sortedFinalRevenueByGender = {
    Female: {},
    Male: {}
  };
  topSubCategories.forEach((subCategory) => {
    sortedFinalRevenueByGender.Female[subCategory] = finalRevenueByGender.Female[subCategory];
    sortedFinalRevenueByGender.Male[subCategory] = finalRevenueByGender.Male[subCategory];
  });
  sortedFinalRevenueByGender.Female.Other = finalRevenueByGender.Female.Other;
  sortedFinalRevenueByGender.Male.Other = finalRevenueByGender.Male.Other;

  return sortedFinalRevenueByGender;
}

// Function to update revenue chart by gender
function updateRevenueByGenderChart() {
  const selectedYear = yearDropdown.value;
  const filteredRevenueData = processRevenueDataByGender(rawData, selectedYear);

  const subCategories = Object.keys(filteredRevenueData.Female);
  revenueByGenderChart.data.labels = subCategories;
  revenueByGenderChart.data.datasets[0].data = subCategories.map(
    (subCategory) => filteredRevenueData.Female[subCategory] || 0
  );
  revenueByGenderChart.data.datasets[1].data = subCategories.map(
    (subCategory) => filteredRevenueData.Male[subCategory] || 0
  );

  revenueByGenderChart.update(); // Update the chart with new data
}

// Fetch or load your JSON data here
fetch("./data/data.json") // Replace with your data loading method
  .then((response) => response.json())
  .then((data) => {
    rawData = data;
    const initialData = processRevenueDataByGender(data, "all");

    const ctx = document.getElementById("doubleBarChart").getContext("2d");
    const labels = Object.keys(initialData.Female);
    const femaleRevenueValues = Object.values(initialData.Female);
    const maleRevenueValues = Object.values(initialData.Male);

    revenueByGenderChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Female",
            data: femaleRevenueValues,
            backgroundColor: "#b07cff",
            borderWidth: 1,
          },
          {
            label: "Male",
            data: maleRevenueValues,
            backgroundColor: "#6b7dff",
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: "x",
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
          },
          x: {
            stacked: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Total Revenue Sub Category by Gender",
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
  });
