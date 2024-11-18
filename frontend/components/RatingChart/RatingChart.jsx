import * as React from 'react';
import { PieChart } from '@mui/x-charts';

const RatingChart = ({ data }) => {
  // Define colors that represent each star rating
  const colors = ['#FF5252', '#FFB74D', '#FFD740', '#4CAF50', '#2196F3'];

  // Prepare data for the pie chart with specific colors
  const pieData = data.map((item) => ({
    ...item,
    color: colors[item.id], // Assign color based on the item id (assuming id corresponds to star rating - 1)
  }));

  return (
    <div style={{ width: '100%', height: 200 }}>
      <PieChart
        series={[
          {
            data: pieData,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'lightgray' },
          },
        ]}
      />
    </div>
  );
};

export { RatingChart };
