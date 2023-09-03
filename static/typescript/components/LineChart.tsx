import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns'; 
import { Chart as ChartJS } from "chart.js/auto";
import { 
  CategoryScale, 
  ChartOptions,
  ChartData
} from "chart.js";
import { SensorData } from "./SensorData";

ChartJS.register(
  CategoryScale
);

const CustomCharOptions: ChartOptions<"line"> = {
  plugins: {
    title: {
      display: true,
      text: "Temperature (C) and Humidty (%) detected by DHT11 sensor"
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

function createDatasetsAndLabels(sensorDataInstances: SensorData[]): ChartData<"line", number[], Date> {
  const sortedSensorDataInstances = sensorDataInstances
  .sort((a: { sample_time: number }, b: { sample_time: number }) => b.sample_time - a.sample_time)
  return {
      labels: sortedSensorDataInstances.map((row: { sample_time: number }) => new Date(row.sample_time)),
      datasets: [
          {
              label: 'Temperature',
              data: sortedSensorDataInstances.map((row: SensorData) => row.temperature),
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4,
              yAxisID: 'y'
          },
          {
              label: 'Humidity',
              data: sortedSensorDataInstances.map((row: SensorData) => row.humidity),
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4,
              yAxisID: 'y1',  
          }
      ]
  }
}

export default function LineChart(sensorDataInstances: SensorData[]) {
  const sensorDataArray = Object.values(sensorDataInstances)
  if (sensorDataArray.length > 0) { 
    return (
      <Line 
        options={CustomCharOptions}
        data={createDatasetsAndLabels(sensorDataArray)}
      />
    );
  }
  else {
    return <div>No Data in selected date range</div>
  }
}
