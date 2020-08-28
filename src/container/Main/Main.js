import React, { Component } from 'react';
import classes from './Main.module.css';
import Charts from '../../components/Charts/Charts'
import axios from 'axios';
import { mapData, mapTotalData, setMapData } from '../../mapper';
import Rows from '../../components/Rows/Rows';
import Boxes from '../../components/Boxes/Boxes';
import Map from '../Map/Map'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastWeek: null,
            current: null,
            mapData: null,
            todayData: null,
            chart: null
        }
    }

    componentDidMount() {
        if (!this.state.current && !this.state.lastWeek) {
            axios.get('https://api.covid19india.org/states_daily.json')
                .then(response => {
                    let data = response.data.states_daily;
                    let states = data.slice(data.length - 21);
                    let parsedData = mapData(states);
                    let element = []
                    for (let date in parsedData) {
                        element.push([
                            date.substring(0,date.length-5),
                            +parsedData[date].TT.Confirmed,
                            +parsedData[date].TT.Recovered,
                            +parsedData[date].TT.Deceased
                        ])
                    }
                    this.setState({ chart: element, lastWeek: parsedData })

                }).catch(err => {
                    console.log(err)
                })

            axios.get('https://api.covid19india.org/data.json')
                .then(response => {
                    let data = mapTotalData(response.data.statewise.slice(0, 37));
                    this.setState({ current: data, todayData: data.TT, mapData: setMapData(data) });
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    stateDataHandler = (code) => {
        let element = []
        let data = this.state.lastWeek;
        for (let date in data) {
            element.push([
                date.substring(0,date.length-5),
                +data[date][code].Confirmed,
                +data[date][code].Recovered,
                +data[date][code].Deceased
            ])
        }
        this.setState({ chart: element, todayData: this.state.current[code] })
    }

    mouseLeaveHandler = () => {
        let element = []
        let data = this.state.lastWeek;
        for (let date in data) {
            element.push([
                date.substring(0,date.length-5),
                +data[date].TT.Confirmed,
                +data[date].TT.Recovered,
                +data[date].TT.Deceased
            ])
        }
        this.setState({ chart: element, todayData: this.state.current.TT })
    }

    render() {
        let data = null;
        if (!Object.values(this.state).some(o => o === null)) {
            data = (
                <div className={classes.Main}>
                    <div className={classes.Left}>
                        <Charts data={this.state.todayData} line={this.state.chart} />
                        <Rows data={this.state.current} hover={this.stateDataHandler} unhover={this.mouseLeaveHandler} />
                    </div>
                    <div className={classes.Right}>
                        <Boxes data={this.state.todayData} />
                        <div className={classes.Center}>
                            <div className={classes.State}>
                                <h2>{this.state.todayData.name === 'Total' ? 'INDIA' : this.state.todayData.name}</h2>
                            </div>
                            <div className={classes.Update}>
                                <h2>LAST UPDATED ON</h2>
                                <h4>{this.state.todayData.lastUpdated}</h4>
                            </div>
                        </div>
                        <div className={classes.Map}>
                            <Map data={this.state.mapData} />
                        </div>
                    </div>
                </div>
            )
        }
        return data;
    }
}

export default Main;