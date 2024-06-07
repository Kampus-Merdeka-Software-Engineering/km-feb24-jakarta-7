let profitChart;
const yearOption = document.getElementById("year");
yearOption.addEventListener("change", updateProfitChart);

// Function to process JSON data for profit chart
function processDataForProfit(data, yearFilter) {
    const profitDataFiltered = {};
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (yearFilter === "all") {
        data.reduce((acc, curr) => {
            if (!acc[curr.Year]) {
                acc[curr.Year] = 0;
            }
            acc[curr.Year] += curr.Profit;
            return acc;
        }, profitDataFiltered);
    } else {
        data
            .filter((item) => item.Year == yearFilter)
            .reduce((acc, curr) => {
                if (!acc[curr.Month]) {
                    acc[curr.Month] = 0;
                }
                acc[curr.Month] += curr.Profit;
                return acc;
            }, profitDataFiltered);

        // Ensure all months are present in the filtered data with 0 value if missing
        monthOrder.forEach((month) => {
            if (!profitDataFiltered[month]) {
                profitDataFiltered[month] = 0;
            }
        });

        // Sort data by month order
        const sortedProfitDataFiltered = {};
        monthOrder.forEach((month) => {
            if (profitDataFiltered[month] !== undefined) {
                sortedProfitDataFiltered[month] = profitDataFiltered[month];
            }
        });

        return sortedProfitDataFiltered;
    }

    return profitDataFiltered;
}

// Function to update profit chart
function updateProfitChart() {
    const yearSelected = yearOption.value;
    const dataProfitFiltered = processDataForProfit(rawData, yearSelected);

    // Update profit chart with new data
    profitChart.data.labels = Object.keys(dataProfitFiltered);
    profitChart.data.datasets[0].data = Object.values(dataProfitFiltered);
    profitChart.options.plugins.title.text = `Profit Growth ${yearSelected === 'all' ? 'by Year' : yearSelected}`
    profitChart.update(); // Update the chart with new data
}

// Fetch or load your JSON data here
fetch("./data/data.json") // Replace with your data loading method
    .then((response) => response.json())
    .then((data) => {
        rawData = data;
        const initialData = processDataForProfit(data, "all");

        const ctx = document.getElementById("lineChart").getContext("2d");
        const labels = Object.keys(initialData);
        const profitValues = Object.values(initialData);

        profitChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Profit",
                        data: profitValues,
                        borderColor: "#B07CFF",
                        backgroundColor: "rgb(176, 124, 255, .4)",
                        tension: 0.4,
                        fill: true,
                    },
                ],
            },
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
                        text: "Profit Growth by Year",
                    },
                },
            },
        });
    });
