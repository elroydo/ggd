import React from 'react'
import { ResponsiveLine } from '@nivo/line';
import graphData3 from './graphData3.json'

const Graph3 = () => {
    return (
        <div>
            <h3>Plastic in the Ocean</h3>
        <div
        style={{
            height: 380,
            width: 650,
            marginLeft: 30,
            borderRadius: 30,
            margin: "0 auto"
        }}
        >
        <ResponsiveLine
            data={graphData3}
            colors='#0A97D9'
            margin={{ top: 10, right: 70, bottom: 30, left: 80 }}
            xScale={{ type: "linear",min: "auto", max: "auto"}}
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
            legend: "Years",
            legendOffset: 36,
            legendPosition: "middle",
            }}
            axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Plastic Tonnes in Ocean (tonnes)",
            legendOffset: -60,
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
);
};

export default Graph3
