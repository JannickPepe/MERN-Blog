import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ArticleGraph = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const fetchGraphData = async () => {
    const { data } = await axios.get('/api/article/stats', {
      params: { timeRange },
    });
    return data;
  };

  const { data: graphData = { articles: [], totalArticles: 0 }, isLoading, isError } = useQuery({
    queryKey: ['articleStats', timeRange],
    queryFn: fetchGraphData,
    keepPreviousData: true,
  });

  const labels = graphData.articles.map((point) => point.date);
  const values = graphData.articles.map((point) => point.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Articles Created',
        data: values,
        borderColor: 'rgba(59, 130, 246, 1)', // Blue
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Light Blue
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Articles: ${tooltipItem.raw}`, // Tooltip for data points
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Articles Created' }, beginAtZero: true },
    },
  };

  if (isLoading) {
    return <p>Loading graph...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load graph data.</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
          Article Stats
        </h2>
        <select
          className="bg-gray-200 text-gray-700 rounded px-4 py-2"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last Month</option>
        </select>
      </div>

      <Line data={chartData} options={options} />

      {/* Total Articles Section */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Total Articles: {graphData.totalArticles}
        </h3>
      </div>
    </div>
  );
};

export default ArticleGraph;
