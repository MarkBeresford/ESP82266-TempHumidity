import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns'; 
import { Chart as ChartJS } from "chart.js/auto";
import { 
  CategoryScale, 
  ChartOptions,
  PluginOptionsByType,
  TitleOptions
} from "chart.js";

ChartJS.register(
  CategoryScale
);

const charOptions: ChartOptions<'scatter'> = {
  plugins: {
    title: {
      display: true,
      text: "Temperature humidty graph for ESP32 sensor"
    }
  },
  scales: {
    x: {
      bounds: 'ticks',
      type: 'timeseries',
      title: {
        display: true,
        text: 'Datetime'
      }
    },
    y: {
      bounds: 'ticks',
      type: 'linear',
      beginAtZero: false,
      grace: '10%',
      position: 'left',
      title: {
        display: true,
        text: 'Temperate (C)'
      }
    },
    y1: {
      bounds: 'ticks',
      type: 'linear',
      beginAtZero: false,
      grace: '10%',
      position: 'right',
      title: {
        display: true,
        text: 'Humidity (%)'
      },
      grid: {
        drawOnChartArea: false,
      },
    }
  },
  responsive: true,
  maintainAspectRatio: true,
  spanGaps: false
}


export default function LineChart(chartData) {
  
  const dataPresentInTimeRange = (chartData.datasets[0].data.length > 0)

  if (dataPresentInTimeRange) { 
    return (
      <Line 
        options={charOptions} 
        data={chartData}
      />
    );
  }
  else {
    return <div>No Data in selected date range</div>
  }
}
