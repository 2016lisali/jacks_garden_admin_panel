import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales Statics',
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
  salesData?.forEach(data => labels.push(data.month))

  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Sales',
        data: labels.map(item => {
          for (let d of salesData) {
            if (d.month == item) {
              return d.totalAmount / 100
            }
          }
        }),
        borderColor: '#198754',
        backgroundColor: '#fff',
      }
    ],
  };
  console.log("salesData", salesData);
  return <Line className="rounded-3 shadow bg-white p-4 mx-3 mt-4" options={options} data={data} />;
}
