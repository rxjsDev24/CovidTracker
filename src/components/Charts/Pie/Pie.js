import { Chart } from 'react-google-charts';
import React from 'react';
import classes from './Pie.module.css'

const Pie = (props) => {

    let active = +props.data.Active;
    let deaths = +props.data.Deceased;
    let recover = +props.data.Recovered;
    let chartData = [
        ['Type', 'No of Cases'],
        ['Active', active],
        ['Deceased', deaths],
        ['Recovered', recover]
    ]
    return (
        <div className={classes.Pie}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="PieChart"
                loader={<div className={classes.Chart}>Loading Chart</div>}
                data={chartData}

                options={{
                    // Just add this option
                    // chartArea: { left: auto },
                    legend: { position: 'bottom', textStyle: { fontSize: 8 } },
                    pieHole: 0.7,
                    colors: ['#63D1F4', '#9FB6CD', '#00c400'],
                    pieSliceText: 'none'
                }}
                rootProps={{ 'data-testid': '3' }}
            />
        </div>
    )
}

export default Pie;