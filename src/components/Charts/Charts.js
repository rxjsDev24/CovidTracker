import React from 'react'
import classes from './Charts.module.css'
import Pie from './Pie/Pie'

const Charts = (props) => {
    console.log(props.data);
    return (
        <div className={classes.Charts}>
            <Pie data={props.data} />
        </div>
    )
}

export default Charts;