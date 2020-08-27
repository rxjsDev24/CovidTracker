import React, { Component } from 'react';
import classes from './Main.module.css';
import Charts from '../../components/Charts/Charts'
import axios from 'axios';
import { mapData, mapTotalData } from '../../mapper';
import Rows from '../../components/Rows/Rows';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastWeek: null,
            current: null
        }
    }

    componentDidMount() {
        axios.get('https://api.covid19india.org/states_daily.json')
            .then(response => {
                let data = response.data.states_daily;
                let states = data.slice(data.length - 21);
                let parsedData = mapData(states);
                this.setState({ lastWeek: parsedData })
            }).catch(err => {
                console.log(err)
            })

        axios.get('https://api.covid19india.org/data.json')
            .then(response => {
                let data = mapTotalData(response.data.statewise.slice(0, 37));
                this.setState({ current: data });
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        let data = null;
        if (this.state.current && this.state.lastWeek) {
            data = (
                <div className={classes.Main}>
                    <div className={classes.Left}>
                        <Charts data={this.state.current.TT} />
                        <Rows data={this.state.current} />
                    </div>
                    <div className={classes.Right}>

                        {/* <Map /> */}
                    </div>
                </div>
            )
        }
        return data;
    }
}

export default Main;