import React from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

// Define an array of colors for the pie chart segments
const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff6666', '#ffa8c2', '#8dd1e1'];

function CustomPieChart({ data, innerRadius, outerRadius }) {
  
  const chartData = data.map((record,index) => ({
    name: record?.project?.title,
    timeSpent: parseFloat(record.timeSpent.split(':')[0]),
    fill: pieColors[index % pieColors.length],
  }));

  return (
    <ResponsiveContainer width={53} height={120} style={{ margin: 'auto' }}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="timeSpent"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          // fill="#8884d8"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;
