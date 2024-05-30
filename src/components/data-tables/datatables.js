// datatable
$(document).ready(function () {
  $.ajax({
    url: "https://raw.githubusercontent.com/Kampus-Merdeka-Software-Engineering/km-feb24-jakarta-7/main/data/australia_bike_sales.json",
    dataType: "json",
    success: function (data) {
      var table = $("#dataTables").DataTable({
        data: data,
        columns: [
          { data: "Date" },
          { data: "Customer_Age" },
          { data: "Age_Group" },
          { data: "Customer_Gender" },
          { data: "Country" },
          { data: "State" },
          { data: "Product_Category" },
          { data: "Sub_Category" },
          { data: "Product" },
          { data: "Order_Quantity" },
          { data: "Unit_Cost" },
          { data: "Unit_Price" },
          { data: "Profit" },
          { data: "Cost" },
          { data: "Revenue" },
          { data: "Profit_Per_Quantity" },
        ],
        responsive: true,
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "pdf", "print"],
        rowReorder: {
          selector: "td:nth-child(2)",
        },
      });
    },
  });
});
