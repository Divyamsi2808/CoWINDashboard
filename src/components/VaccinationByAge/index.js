import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  const Colors = ['#2d87bb', '#a3df9f', '#64c2a6']
  return (
    <div className="chart-container">
      <h1 className="heading-ele">Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByAge}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="70%"
            dataKey="count"
          >
            {vaccinationByAge.map((entry, index) => (
              <Cell
                key={`cell-${index + 1}`}
                name={entry.age}
                fill={Colors[index]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
