import React, { useState, useEffect } from 'react';
import 'chartjs-adapter-date-fns'; 
import { ApiService } from './ApiService';
import LineChart from './LineChart';
import { DateRange as DateRangeCal, Range as RangeCal } from 'react-date-range';
import { SensorData } from './SensorData';
import { DateRange } from './DateRangs';

export default function TempHumViewer() {
  const apiService: ApiService = new ApiService()

  const [chartData, setChartData] = useState<SensorData[]>();
  const [date, setDate] = useState<DateRange>(
    new DateRange(
      new Date,
      new Date(),
      'selection'
    )
  );
  const [haveData, setHaveData] = useState(false);

  function updateChart(Dates: DateRange) {
    apiService.PostDatesForTempHumData([Dates.startDate.toLocaleDateString(), Dates.endDate.toLocaleDateString()])
    .then((updateChartData: SensorData[]) => {
      setHaveData(false)
      setChartData(updateChartData)
      setHaveData(true)
    })
  }

  useEffect(() => {
    updateChart(date)
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
            const SelectedDateRange: RangeCal = [item.selection][0]
            const NewDateRange: DateRange = new DateRange(
              SelectedDateRange.startDate,
              SelectedDateRange.endDate,
              SelectedDateRange.key
            )
            setDate(NewDateRange)
            updateChart(NewDateRange)
          }}
          moveRangeOnFirstSelection={false}
          ranges={[date]}
        />
        <button onClick={() => {updateChart(date)}}>Refresh</button>
      </div>
      <div className='chart-container'>
        <LineChart 
          { ...chartData }
        />
      </div>
    </div>
    ); 
  }
}
