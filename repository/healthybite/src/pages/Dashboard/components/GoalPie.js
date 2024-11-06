import { PieChart } from '@mui/x-charts'
import React from 'react'

function GoalPie({consumed, goal,label}) {
    return (
    <div className="flex relative justify-center items-center w-32 md:w-40 p-3">
        <PieChart
            series={[
                {
                    data:[
                        {value:consumed},
                        {value: goal-consumed}
                    ],
                    innerRadius: window.innerWidth < 768 ? window.innerWidth < 468 ? 30 : 35 : 40,
                    outerRadius: window.innerWidth < 768 ? window.innerWidth < 468 ? 38 : 50 : 55,
                }
                
            ]}
            colors={['#ffd43b','#ebebeb']}
            width={5}
            height={window.innerWidth < 468 ? 75: 110}
            slotProps={{
                legend: { hidden: true },
            }}
        />
        <div className="absolute top-0 flex items-center justify-center w-full h-full">
            <p className="font-semibold text-sm md:text-md text-healthyYellow">{label}</p>
        </div>
    </div>
    )
}

export default GoalPie