import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';

import api from '../../services/api';

type SeriesData = {
  name: string;
  data: number[];
}

type ChartData = {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
}

export const BarChat = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: []
    },
    series: [
      {
        name: "",
        data: []
      }
    ]
  })

  useEffect(() => {
    api.get('/sales/success-by-seller').then((response) => {
      const data = response.data as SaleSuccess[];
      const myLabels = data.map(item => item.sellerName);
      const mySeries = data.map(item => round(100.0 * item.deals / item.visited, 1));
      
      console.log("susscess: ", mySeries)
      setChartData({
        labels: {
          categories: myLabels
        },
        series: [
          {
            name: "% Success",
            data: mySeries
          }
        ]
      });
    });
  }, []) 

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };


  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  )
}