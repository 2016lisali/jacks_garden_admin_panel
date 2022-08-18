// import { Line } from 'react-chartjs-2';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    // PointElement,
    // LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    // PointElement,
    // LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Sales Statics",
        },
    },
    // scales: {
    //   y: [{
    //     scaleLabel: {
    //       display: true,
    //       labelString: '$ Total Amount'
    //     }
    //   }],
    //   x: [{
    //     scaleLabel: {
    //       display: true,
    //       labelString: 'Month'
    //     }
    //   }],
    // }
};

export function SalesChart({ salesData }) {
    const labels = [];
    salesData?.forEach((data) => labels.push(data.month));

    const data = {
        labels,
        datasets: [
            {
                label: "Monthly Sales",
                data: labels.map((item) => {
                    let sales = 0;
                    for (let d of salesData) {
                        if (d.month === item) {
                            sales = d.totalAmount / 100;
                        }
                    }
                    return sales;
                }),
                // borderColor: '#198754',
                // backgroundColor: '#fff',
                backgroundColor: "rgba(25,135,84,0.5)",
            },
            {
                label: "Average Sales",
                data: labels.map((item) => {
                    let average = 0;
                    salesData.forEach(
                        (data) => (average += data.totalAmount / 100)
                    );
                    // let sales = 0;
                    // for (let d of salesData) {
                    //   if (d.month === item) {
                    //     sales = d.totalAmount / 100
                    //   }
                    // }
                    return average / salesData.length;
                }),
                // borderColor: '#198754',
                // backgroundColor: '#fff',
                backgroundColor: "rgba(13,110,253, 0.5)",
            },
        ],
    };

    return (
        <Bar
            className="rounded-3 shadow bg-white p-4 mx-3 mt-4"
            options={options}
            data={data}
        />
    );
}
