import React from 'react'
import { ResponsiveBar } from '@nivo/bar';
import graphData4 from './graphData4.json'

const Graph4 = () => {
    return (
        <div>
            <h3>Global Annual Tree Cover Loss</h3>
        <div
        style={{
            height: 380,
            width: 650,
            marginLeft: 10,
            borderRadius: 30,
            margin: "0 auto",
        }}
        >
        <ResponsiveBar
                    data={graphData4}
                    keys={[ 'Other', 'United States','Russia', 'Indonesia', 'Canada', 'Brazil']}
                    indexBy="Year"
                    margin={{ top: 50, right: 10, bottom: 30, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'set2' }}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Tree Cover Loss (Mha)',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    enableLabel={false}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    legends={[
                        {
                        dataFrom: 'keys',
                        reverse: true,
                        anchor: 'top-left',
                        direction: 'row',
                        justify: false,
                        translateX: -5,
                        translateY: -35,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,         effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
        />
    </div>
        </div>
    )
}

export default Graph4
