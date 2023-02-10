/* eslint-disable no-unused-vars */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const options = {
  plugins: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 20,
        },
      },
    },
  },
};

export default function BarChart({ chartData }) {
  return <Line data={chartData} option={options} />;
}
