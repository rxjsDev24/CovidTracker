import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dataviz);

class Map extends Component {

    componentDidMount() {
        let chart = am4core.create("chartdiv", am4maps.MapChart);

        chart.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/india2020High.json"

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        chart.chartContainer.wheelable = false;

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        polygonSeries.events.on("out", out);
        const myfunc = this.props.unhover;
        function out(ev) {
            console.log('check')
            ev.target.mapPolygons.each(myfunc);
        }

        //HeatMap rules
        polygonSeries.heatRules.push({
            property: "fill",
            target: polygonSeries.mapPolygons.template,
            min: chart.colors.getIndex(1).brighten(1),
            max: chart.colors.getIndex(1).brighten(-0.3)
        });

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        polygonSeries.data = this.props.data;

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";

        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#ff073fde");

        polygonTemplate.events.on("over", (ev) => {
            this.props.hover(ev.target.dataItem.dataContext.code);
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
