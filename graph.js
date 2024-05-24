const data = {
    labels: ['New South Wales', 'Victoria', 'Queensland', 'South Australia', 'Tasmania'],
    datasets: [{
        label: 'Order Quantity',
        data: [114898, 65668, 56958, 15619, 8028],
        backgroundColor: [
            'rgba(52, 235, 61, 0.5)',
            'rgba(52, 235, 61, 0.4)',
            'rgba(52, 235, 61, 0.3)',
            'rgba(52, 235, 61, 0.2)',
            'rgba(52, 235, 61, 0.1)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    }]
};

// Konfigurasi pie chart dengan plugin datalabels
const config = {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: true, // Menonaktifkan aspek rasio agar dapat menyesuaikan ukuran
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Order Quantity by State'
            },
            datalabels: {
                formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value * 100 / sum).toFixed(2) + "%";
                    return percentage;
                },
                color: '#fff',
                font: {
                    weight: 'bold'
                }
            }
        }
    },
};

// Membuat pie chart
var myPieChart = new Chart(
    document.getElementById('myPieChart'),
    config
);