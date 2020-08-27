import React, { Component } from 'react';
import classes from './Main.module.css';
import Left from './Left/Left';
import Right from './Right/Right';

class Main extends Component {
    render() {
        return (
            <div className={classes.Main}>
                <Left />
                <Right />
            </div>
        )
    }
}

export default Main;