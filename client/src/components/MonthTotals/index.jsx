import { Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

function MonthTotals() {
  const data = [
    { name: 'Project A', hours: 10 },
    { name: 'Project B', hours: 8 },
    { name: 'Project C', hours: 15 },
    { name: 'Project D', hours: 5 },
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
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Legend payload={legendItems} />
        </PieChart>
      </ResponsiveContainer>
      FULL TIME SHEET
    </div>
  )
}

export default MonthTotals