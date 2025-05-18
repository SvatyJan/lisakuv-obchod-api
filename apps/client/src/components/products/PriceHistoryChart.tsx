import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format } from 'date-fns';
import { PriceHistoryEntry } from '../../types/product';

interface PriceHistoryChartProps {
  priceHistory: PriceHistoryEntry[];
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ priceHistory }) => {
  const chartData = priceHistory.map(entry => ({
    date: format(new Date(entry.changedAt), 'MMM dd, yyyy'),
    oldPrice: entry.oldPrice,
    newPrice: entry.newPrice,
  }));

  if (priceHistory.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-forest-500">No price history available.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              borderColor: '#C5E1A5',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="oldPrice"
            stroke="#A0522D"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Previous Price"
          />
          <Line
            type="monotone"
            dataKey="newPrice"
            stroke="#4A7C59"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="New Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;