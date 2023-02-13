/* eslint-disable no-unused-vars */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

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
  scales: {
    y: {
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

export default function BarChart({ chartData }) {
  return <Line data={chartData} options={options} />;
}
