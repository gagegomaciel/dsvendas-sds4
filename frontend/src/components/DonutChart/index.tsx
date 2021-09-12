import { useState } from 'react';
import Chart from 'react-apexcharts';

import api from '../../services/api';
import { SaleSum} from '../../types/sale';

interface IChartDataProps {
  labels: string[];
  series: number[];
}



export const DonutChat = () => {
  let charData : IChartDataProps = { labels: [], series: [] }
  api.get('/sales/amount-by-seller').then((response) => {
    const data = response.data as SaleSum[];
    const myLabels = data.map(item => item.sellerName);
    const mySeries = data.map(item => item.sum);

    charData = { labels: myLabels, series: mySeries };

    console.log(charData);

  });


  const mockData = {
    series: [477138, 499928, 444867, 220426, 473088],
    labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  }

  const options = {
      legend: {
        show: true
      }
  }
  return (
    <Chart 
      options={{ ...options, labels: mockData.labels }}
      series={mockData.series}
      type="donut"
      height="240"
    />
  )
}