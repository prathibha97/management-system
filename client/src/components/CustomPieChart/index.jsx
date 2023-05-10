import React from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

function CustomPieChart({ data, innerRadius, outerRadius }) {
  return (
    <ResponsiveContainer width={53} height={400} style={{ margin: 'auto' }}>
      <PieChart>
        <Pie
          data={data}
          dataKey="hours"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart