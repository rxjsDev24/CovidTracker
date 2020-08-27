import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Map extends Component {
    componentDidMount() {
        let chart = am4core.create("chartdiv", am4maps.MapChart);

        chart.paddingRight = 20;

        chart.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/india2020High.json"

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        polygonSeries.data = [
            {
                id: "IN-DL",
                value: 207
            },
            {
                id: "IN-LK",
                value: 500
            }
        ]

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#74B266");

        polygonTemplate.tooltipText = "{name}: {id}";

        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");

        polygonTemplate.events.on("hit", function (ev) {
            console.log(`${ev.target.dataItem.dataContext.id} : ${ev.target.dataItem.dataContext.value}`);
        });


        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        );
    }
}

export default Map;
