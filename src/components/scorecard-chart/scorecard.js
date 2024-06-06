document.addEventListener("DOMContentLoaded", () => {
  const totalOrders = document.querySelector(".total-order");
  const totalRevenues = document.querySelector(".total-revenue");
  const totalProfits = document.querySelector(".total-profit");

  document.getElementById("year").addEventListener("change", (e) => {
    let year = e.target.value;
    updateScorecard(year);
  });

  function formatNumber(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number;
    }
  }

  function updateScorecard(year) {
    let scoreCardFiltered = {};
    if (year == "all") {
      rawData.reduce((acc, item) => {
        acc.totalOrder = (acc.totalOrder || 0) + item.Order_Quantity;
        acc.totalRevenue = (acc.totalRevenue || 0) + item.Revenue;
        acc.totalProfit = (acc.totalProfit || 0) + item.Profit;
        return acc;
      }, scoreCardFiltered);
      totalOrders.textContent = formatNumber(scoreCardFiltered.totalOrder);
      totalRevenues.textContent = formatNumber(scoreCardFiltered.totalRevenue);
      totalProfits.textContent = formatNumber(scoreCardFiltered.totalProfit);
    } else {
      rawData
        .filter((item) => item.Year == year)
        .reduce((acc, item) => {
          acc.totalOrder = (acc.totalOrder || 0) + item.Order_Quantity;
          acc.totalRevenue = (acc.totalRevenue || 0) + item.Revenue;
          acc.totalProfit = (acc.totalProfit || 0) + item.Profit;
          return acc;
        }, scoreCardFiltered);
      totalOrders.textContent = formatNumber(scoreCardFiltered.totalOrder);
      totalRevenues.textContent = formatNumber(scoreCardFiltered.totalRevenue);
      totalProfits.textContent = formatNumber(scoreCardFiltered.totalProfit);
    }
  }
});
