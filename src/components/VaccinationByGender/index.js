import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  const Colors = ['#f54394', '#5a8dee', '#2cc6c6']

  return (
    <div className="chart-container">
      <h1 className="heading-ele">Vaccination by Gender</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByGender}
            startAngle={180}
            endAngle={0}
            innerRadius="30%"
            outerRadius="70%"
            dataKey="count"
          >
            {vaccinationByGender.map((entry, index) => (
              <Cell
                key={`cell-${index + 1}`}
                name={entry.gender}
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

export default VaccinationByGender
