import React from 'react'
import classes from './Charts.module.css'
import Pie from './Pie/Pie'
import Line from './Line/Line';

const Charts = (props) => {
    return (
        <div className={classes.Charts}>
            <Pie data={props.data} />
            <Line data={props.line} />
        </div>
    )
}

export default Charts;