import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import '../Components/UserProfile/user-profile.css'
import { getCalculatorResults } from '../Components/UserProfile/UserAPI'

class carbonFootprintHistory extends Component {
    state = {
        foodEmission: (0),
        vehicleEmission: (0),
        airplaneEmission: (0),
        electricityEmission: (0),
        stuffEmission: (0),
        resultEmission: [],
        dateEmission: [],
        lineData: [] 
    };
    async componentDidMount() {
        try{
            const calculatorResults = await getCalculatorResults();
            var date = [], result = [], data = []
            for (var i=0; i<calculatorResults.length; i++) {
                date.push(calculatorResults[i].dateCompleted);
                result.push(calculatorResults[i].resultTonnes);
                   
            }
            for (var j=0; j<calculatorResults.length; j++) {
                var obj = {};
                if(date[j] !== date[j+1]){
                    obj['x'] = date[j];       
                    obj['y'] = result[j];
                    data.push(obj) 
                }
            }
            this.setState({
                foodEmission: calculatorResults[calculatorResults.length - 1].emissionOne,
                vehicleEmission: calculatorResults[calculatorResults.length - 1].emissionTwo,
                airplaneEmission: calculatorResults[calculatorResults.length - 1].emissionThree,
                electricityEmission: calculatorResults[calculatorResults.length - 1].emissionFour,
                stuffEmission: calculatorResults[calculatorResults.length - 1].emissionFive,
                lineData: data
            });
        }catch(error){
            this.setState({ resultAPIError: "Could not find any result"});
        }
        
    }
    render(){
        const {foodEmission, vehicleEmission, airplaneEmission, electricityEmission, stuffEmission, lineData} = this.state;
        return (
            <div>
                <div className="col element element-top">
                    <div>
                        <h4> Your History vs Global CO<sub>2</sub> Consumption </h4>
                    </div>
                <div style = {{height: 450}}>
                <ResponsiveBar
                data={
                    [
                        {
                            "overall": "You",
                            "Food": foodEmission,
                            "FoodColor": "hsl(147, 50%, 47%)",
                            "Vehicle": vehicleEmission,
                            "VehicleColor": "hsl(127, 70%, 50%)",
                            "Airplane": airplaneEmission,
                            "AirplaneColor": "hsl(120, 70%, 50%)",
                            "Electricity": electricityEmission,
                            "ElectricityColor": "hsl(109, 70%, 50%)",
                            "Stuff": stuffEmission,
                            "StuffColor": "hsl(41, 70%, 50%)"
                        },

                        {
                            "overall": "Global",
                            "Food": 2,
                            "FoodColor": "hsl(147, 50%, 47%)",
                            "Vehicle": 2,
                            "VehicleColor": "hsl(127, 70%, 50%)",
                            "Airplane": 3.3,
                            "AirplaneColor": "hsl(120, 70%, 50%)",
                            "Electricity": 2,
                            "ElectricityColor": "hsl(109, 70%, 50%)",
                            "Stuff": 1,
                            "StuffColor": "hsl(300, 76%, 72%)"
                        }
                    ]
                }
                width={450}
                keys={['Food', 'Vehicle', 'Airplane', 'Electricity', 'Stuff']}
                indexBy="overall"
                margin={{ top: 50, right: 40, bottom: 80, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
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
                    legend: 'Tonnes Pollution CO2e',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                            reverse: true,
                            anchor: 'top',
                            direction: 'row',
                            justify: false,
                            translateX: -5,
                            translateY: -35,
                            itemsSpacing: 2,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
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
    
            <div className="col element element-bottom">
            <div>
                <h4> Your History: </h4>
            </div>
            <div style={{height: 450}}>
            <ResponsiveLine
            data={[
                {
                    "id": "Results",
                    "color": "hsl(109, 70%, 50%)",
                    "data": lineData
                  }
            ]}
            width = {550}
            colors={{ scheme: "paired" }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Pollution',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
        </div>
        </div>
        </div>
        )

    }
    
}

export default carbonFootprintHistory;

