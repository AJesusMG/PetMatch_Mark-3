// components/CustomPieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Card } from '@nextui-org/react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CustomPieChartProps {
  title: string;
  labels: string[];
  data: number[];
  backgroundColors: string[];
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({ title, labels, data, backgroundColors }) => {
  const chartData: ChartData<'pie'> = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <Card className="lg:w-[500px] lg:h-[270px] w-[360px] h-[400px] p-4 items-center">
      <Pie data={chartData} options={options} />
    </Card>
  );
};

export default CustomPieChart;
