import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, value, index, data }) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      fontSize={12}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${data[index].name} (${value} hours)`}
    </text>
  );
}

function MonthTotals({ data }) {
  const totalHours = data?.reduce((acc, curr) => acc + curr.hours, 0) || 0;
  const projectCount = data?.length || 0;

  const legendItems = [
    { value: `Projects: ${projectCount}`, type: 'star', id: 'projects' },
    { value: `Total Hours: ${totalHours}`, type: 'star', id: 'hours' }
  ];

  return (
    <div className="w-full h-[400px] bg-white rounded p-5">
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faClock} className="mr-1 text-navy" />
        <Link to="/timesheet" className="text-navy hover:underline">
          View Full Timesheet
        </Link>
      </div>
      <ResponsiveContainer width="100%" style={{ margin: 'auto' }} >
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
            labelLine={false}
            label={<CustomLabel data={data} />}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingBottom: '10px' }}
            payload={legendItems}
          />
          {/* <Tooltip
            formatter={(value, name, props) => [`${value} hours`, name, props.payload.tag]}
          /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthTotals;
