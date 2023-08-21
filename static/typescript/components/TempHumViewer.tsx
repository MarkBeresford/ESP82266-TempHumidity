import React, { useState, useEffect } from 'react';
import 'chartjs-adapter-date-fns'; 
import { ApiService } from './ApiService';
import LineChart from './LineChart';
import { DateRange as DateRangeCal } from 'react-date-range';

export default function TempHumViewer() {
  const apiService: ApiService = new ApiService()

  const [chartData, setChartData] = useState([]);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [haveData, setHaveData] = useState(false);

  function updateChart(dates) {
    apiService.PostDatesForTempHumData([dates.startDate, dates.endDate])
    .then(updateChartData => {
      setHaveData(false)
      setChartData(updateChartData)
      setHaveData(true)
    })
  }

  useEffect(() => {
    updateChart(date[0])
    }, []);
      
  if (!haveData) { 
    return <div className='loader-container'></div>
  } else {
    return (
    <div className='tmphum-container'>
      <div className='calendar-container'>
        <DateRangeCal 
          editableDateInputs={true}
          onChange={item => {
            setDate([item.selection])
            updateChart([item.selection][0])
          }}
          moveRangeOnFirstSelection={false}
          ranges={date}
        />
        <button onClick={() => {updateChart(date[0])}}>Refresh</button>
      </div>
      <div className='chart-container'>
        <LineChart 
          {chartData}
        />
      </div>
    </div>
    ); 
  }
}
