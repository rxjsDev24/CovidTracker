import React from 'react';
import classes from './Box.module.css';

const Box = (props) => {
    return (
        <div className={classes.Box} style={{ backgroundColor: props.color, color: props.text }}>
            <h2>{props.title}</h2>
            <h4>{props.count}</h4>
        </div>
    )
}

export default Box;