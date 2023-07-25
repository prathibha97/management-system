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
      {`${data[index]?.name} (${Math.floor(value / 3600)} hours)`}
    </text>
  );
}

function convertTimeToSeconds(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function convertSecondsToHours(seconds) {
  return seconds / 3600;
}

function MonthTotals({ data }) {
  if (data === undefined || data === null) {
    // Return null or a placeholder component when data is undefined or null
    return null;
  }

  const projectTotals = data?.reduce((totals, item) => {
    const project = item?.project?.title;
    const timeSpentSeconds = convertTimeToSeconds(item.timeSpent);
    if (!totals[project]) {
      totals[project] = 0;
    }
    totals[project] += timeSpentSeconds;
    return totals;
  }, {});

  // Define an array of colors for the projects
  const projectColors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff6666',
    '#ffa8c2',
    '#8dd1e1',
  ];

  const chartData = Object.entries(projectTotals).map(([project, seconds],index) => ({
    name: project,
    timeSpent: seconds,
    // Assign a color to each project based on its index in the array
    fill: projectColors[index % projectColors.length],
  }));

  const totalSeconds =
    chartData.reduce((acc, curr) => acc + curr.timeSpent, 0) || 0;
  const totalHours = convertSecondsToHours(totalSeconds);
  const projectCount = chartData.length;

  const legendItems = [
    { value: `Projects: ${projectCount}`, type: 'star', id: 'projects' },
    {
      value: `Total Hours: ${totalHours.toFixed(2)}`,
      type: 'star',
      id: 'hours',
    },
  ];

  return (
    <div className="w-full h-[400px] bg-white rounded p-5 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Monthly Project Totals</h2>
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faClock} className="mr-2 text-navy" />
        <Link to="/timesheet" className="text-navy hover:underline">
          View Full Timesheet
        </Link>
      </div>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="timeSpent"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              labelLine={false}
              label={<CustomLabel data={chartData} />}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingBottom: '10px' }}
              payload={legendItems}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthTotals;
