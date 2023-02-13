import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function Graph({ evaluations }) {
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,
          },
        },
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
    },
  };
  const data = {
    labels: evaluations?.data.map(e => e.evalDate.substr(2, 9)),
    datasets: [
      {
        label: '수행능력',
        data: evaluations?.data.map(e => e.evalAbility),
        backgroundColor: ['#42a5f4'],
        borderColor: '#42a5f4',
        // yAxisID: 'y',
        borderWidth: 5,
        pointRadius: 5,
      },
      {
        label: '수업태도',
        data: evaluations?.data.map(e => e.evalAttitude),
        backgroundColor: ['#ffca28'],
        borderColor: '#ffca28',
        // yAxisID: 'y1',
        borderWidth: 5,
        pointRadius: 5,
      },
      {
        label: '수업집중도',
        data: evaluations?.data.map(e => e.evalConcentration),
        backgroundColor: ['#64dd17'],
        borderColor: '#64dd17',
        borderWidth: 5,
        pointRadius: 5,
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
