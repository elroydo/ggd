import React from 'react'
import { ResponsiveLine } from '@nivo/line';
import graphData1 from './graphData1.json';

const Graph1 = () => {
    return (
        <div>
            <h3>Global Land-Ocean Temperature </h3>
        <div
        style={{
            height: 380,
            width: 650,
            marginLeft: 10,
            borderRadius: 30,
            margin: "0 auto",
        }}
        >
        <ResponsiveLine
            data={graphData1}
            colors ='#3F7E44'
            margin={{ top: 10, right: 70, bottom: 30, left: 60 }}
            xScale={{ type: "linear", min: "auto", max: "auto"}}
            yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 36,
            legendPosition: "middle",
            }}
            axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Temperature Anomaly (C)",
            legendOffset: -40,
            legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}         
        />
    </div>
    </div>
    )
}

export default Graph1
