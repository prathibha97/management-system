import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function MonthTotals() {
  const data = [
    { name: 'Project A', hours: 10, tag: 'Tag A' },
    { name: 'Project B', hours: 8, tag: 'Tag B' },
    { name: 'Project C', hours: 15, tag: 'Tag C' },
    { name: 'Project D', hours: 5, tag: 'Tag D' },
  ];

  const totalHours = data.reduce((acc, curr) => acc + curr.hours, 0);
  const projectCount = data.length;

  const legendItems = [
    { value: `Projects: ${projectCount}`, type: 'star', id: 'projects' },
    { value: `Total Hours: ${totalHours}`, type: 'star', id: 'hours' }
  ];

  return (
    <div className="w-full h-[400px]" >
      <ResponsiveContainer width="100%" height={400} style={{ margin: 'auto' }}>
        <PieChart>
          <Pie
            data={data}
            dataKey="hours"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Legend payload={legendItems} />
          <Tooltip label="name" formatter={(value, name, props) => [`${value} hours`, name, props.payload.tag]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthTotals
