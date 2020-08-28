import React from 'react';
import classes from './Row.module.css';

const Row = ({ data, hover, unhover }) => {
    return (
        <div className={classes.Row} onMouseEnter={() => hover(data.code)} onMouseLeave={unhover}>
            <div className={classes.Col}><p>{data.name}</p></div>
            <div className={classes.Col}><p>{data.Confirmed}</p></div>
            <div className={classes.Col}><p>{data.Active}</p></div>
            <div className={classes.Col}><p>{data.Recovered}</p></div>
            <div className={classes.Col}><p>{data.Deceased}</p></div>
        </div>
    )
}

export default Row;