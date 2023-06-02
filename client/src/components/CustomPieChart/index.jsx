import React from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

function CustomPieChart({ data, innerRadius, outerRadius }) {
  const chartData = data.map((record) => ({
    name: record.project.title,
    timeSpent: parseFloat(record.timeSpent.split(':')[0]),
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
          fill="#8884d8"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;
