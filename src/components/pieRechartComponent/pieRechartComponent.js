import React, { Component } from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts';

class PieRechartComponent extends Component {
    COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    RADIAN = Math.PI / 180;

     renderCustomizedLabel = ({
         cx,
         cy,
         midAngle,
         innerRadius,
         outerRadius,
         percent,
         index,
     }) => {
         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
         const x = cx + radius * Math.cos(-midAngle * this.RADIAN);
         const y = cy + radius * Math.sin(-midAngle * this.RADIAN);

         return (
             <text
                 x={x}
                 y={y}
                 fill="white"
                 textAnchor={x > cx ? 'start' : 'end'}
                 dominantBaseline="central"
             >
                 {`${(percent * 100).toFixed(0)}%`}
             </text>
         );
     };

    CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value.toFixed(0)}Р`}</label>
                </div>
            );
        }

        return null;
    };

    render() {
        return (
            <PieChart width={430} height={350}>
                <Pie labelLine={false} label={this.renderCustomizedLabel} data={this.props.pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} fill="#8884d8">
                    {
                        this.props.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<this.CustomTooltip />} />
                <Legend />
            </PieChart>
        );
    }
}

export default PieRechartComponent;
