import { Chart } from 'react-google-charts';
import React from 'react';
import classes from './Line.module.css'


const Line = (props) => {
    let chartData = [
        ['Date', 'Confirmed', 'Recovered', 'Deceased'],
        ...props.data
    ]
    return (
        <div className={classes.Line}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    hAxis: {
                        title: 'Date',
                    },
                    vAxis: {
                        title: 'Cases',
                    },
                    series: {
                        1: { curveType: 'function' },
                    },
                    legend: { position: 'top', textStyle: { fontSize: 8 } },
                    colors: ['#ff0940', '#498b0d', '#9e9e9e']
                }}
                rootProps={{ 'data-testid': '3' }}
            />
        </div>
    )
}

export default Line;