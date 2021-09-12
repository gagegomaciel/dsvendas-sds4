import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import api from '../../services/api';
import { SaleSum} from '../../types/sale';
interface IChartDataProps {
  labels: string[];
  series: number[];
}

export const DonutChat = () => {
  const [chartData, setChartData] = useState<IChartDataProps>({ labels: [], series: [] });

  useEffect(() => {
    api.get('/sales/amount-by-seller').then((response) => {
      const data = response.data as SaleSum[];
      const myLabels = data.map(item => item.sellerName);
      const mySeries = data.map(item => item.sum);
      
  
      setChartData({ labels: myLabels, series: mySeries });
  
      console.log(chartData);
  
    });
  }, [])
 

  const options = {
      legend: {
        show: true
      }
  }
  return (
    <Chart 
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  )
}