import React from 'react';
import classes from './Rows.module.css';
import Row from './Row/Row';

const Rows = (props) => {
    console.log(props.data)
    let elements = [];
    for (let state in props.data) {
        if (state === 'TT' || state==='UN')
            continue;
        elements.push(props.data[state]);
    }
    return (
        <div className={classes.Rows}>
            <div className={classes.Row}>
                <div className={classes.Col}><p>State</p></div>
                <div className={classes.Col}><p>Confirmed</p></div>
                <div className={classes.Col}><p>Active</p></div>
                <div className={classes.Col}><p>Recovered</p></div>
                <div className={classes.Col}><p>Deceased</p></div>
            </div>
            {elements.map(element => {
                return <Row data={element} />
            })}
        </div>
    )
}

export default Rows;