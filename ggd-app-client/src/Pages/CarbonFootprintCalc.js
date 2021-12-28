import React, { useState } from 'react';
import { saveCalculatorResults } from '../Components/UserProfile/UserAPI';
import Auth from '../Auth';
import 'bootstrap/dist/css/bootstrap.css';
import '../Components/Calculator/calculator.css';
import Carousel from 'react-bootstrap/Carousel';
import Flights from '../Images/flights.png';
import Food from '../Images/food.png';
import Electricity from '../Images/electricity.png';
import Appliances from '../Images/appliances.png';
import Car from '../Images/car.png';
import Oranges from '../Images/oranges.png';
import Gauge from '../Images/gauge.png';
import Plane from '../Images/plane.png';
import Weather from '../Images/weather.png';
import Dvds from '../Images/dvds.png';
import { ResponsiveBar } from '@nivo/bar';
import { BsChevronLeft } from "react-icons/bs";

function Calculator() {
    const loggedIn = Auth.isAuthenticated();
    //declaring and initialising variables and states
    const [qCount, setQCount] = useState(0),
        [qChoice, setQChoice] = useState([]),
        [qEmission, setQEmission] = useState([]),
        [result, setResult] = useState(0),
        [progVal, setProgVal] = useState({ width: '0%' });
        //[validateOption, setValidateOption] = useState(false);

    function emissionCalculator() {
        const array = qEmission;
        //add all valules in sum array
        const sum = array.reduce(function (a, b) { return a + b; }, 0);
        setResult(sum.toFixed(2)); //round the sum of option values to 2 decimal places and set result to the value of sum
    }

    const handleChange = (event) => {
        const aChoice = qChoice, aEmission = qEmission, count = qCount + 1;
        aChoice[qCount] = event.target.id.replace(/\D/g, ''); //retrieve option number
        setQCount(count);  //set counter to state
        //setValidateOption(aChoice[count]); //set state to true if option is chosen
        setQChoice(aChoice); //set option number to state
        aEmission[qCount] = parseFloat(event.target.value); //convert string value to float data type
        setQEmission(aEmission); //set emission value from option to state
        emissionCalculator(); //call the emissionCalculator function to calculate the sum
        setProgVal({ width: String((count / 5) * 100 + '%') });  //calculate progress bar value and set state
    }

    const leftHandle = () => {
        //const choice = qChoice; 
        const count = qCount - 1;
        //setValidateOption(choice[count] !== null); //if option has already been checked, set to true, else false
        setQCount(count);  //set counter to state
        setProgVal({ width: String((count / 5) * 100 + '%') }); //calculate progress bar value and set state
    }

    const rightHandle = () => {
        //const choice = qChoice; 
        const count = qCount + 1;
        setQCount(count); //set counter state
        setProgVal({ width: String((count / 5) * 100 + '%') }); //calculate progress bar value and set state
        //setValidateOption(choice[count]); //evaluates whether the value is truthy or not -- checks null, undefined, NaN, empty, 0, or false
    }

    //save results if user is logged in -- validation
    const saveResults = () => {
        const loggedIn = Auth.isAuthenticated();
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        if (loggedIn) {
            const results = {
                emissions: qEmission,
                tonnes: result,
                timeCompleted: date
            }
            saveCalculatorResults(results);
        } else {
            alert("Please sign-in or sign-up to save your Carbon Footprint"); //placeholder, needs to be changed
        }
    }
    
    const graphResults = () => {
        const Food = qEmission[0];
        const Vehicle = qEmission[1];
        const Airplane = qEmission[2]
        const Energy = qEmission[3];
        const Stuff = qEmission[4];
        return (
            <div className="calculator-graph-containter">
                <div className="calculator-graph-key-wrapper">
                    <div className="cg-key"cg><div className="cg-key-colour" style={{ backgroundColor: '#e8c1a0' }}></div>Food</div>
                    <div className="cg-key"cg><div className="cg-key-colour" style={{ backgroundColor: '#f47560' }}></div>Vehicle</div>
                    <div className="cg-key"cg><div className="cg-key-colour" style={{ backgroundColor: '#f1e15b' }}></div>Airplane</div>
                    <div className="cg-key"cg><div className="cg-key-colour" style={{ backgroundColor: '#e8a838' }}></div>Electricity</div>
                    <div className="cg-key"cg><div className="cg-key-colour" style={{ backgroundColor: '#61cdbb' }}></div>Stuff</div>
                </div>
                <div className='calculator-graph'>
                    <ResponsiveBar
                        data={
                            [
                                {
                                    "overall": "You",
                                    "Food": Food,
                                    "FoodColor": "hsl(147, 50%, 47%)",
                                    "Vehicle": Vehicle,
                                    "VehicleColor": "hsl(127, 70%, 50%)",
                                    "Airplane": Airplane,
                                    "AirplaneColor": "hsl(120, 70%, 50%)",
                                    "Electricity": Energy,
                                    "ElectricityColor": "hsl(109, 70%, 50%)",
                                    "Stuff": Stuff,
                                    "StuffColor": "hsl(41, 70%, 50%)"
                                },

                                {
                                    "overall": "Global",
                                    "Food": 1,
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
                        keys={['Food', 'Vehicle', 'Airplane', 'Electricity', 'Stuff']}
                        indexBy="overall"
                        margin={{ top: 10, right: 40, bottom: 40, left: 70 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
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
                        enableLabel={false}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="calculator-main">
            <h3 className="page-heading" style={{ fontSize: '2.5rem', fontWeight: 'bold', paddingTop: 30, paddingBottom: 30 }}>How big is your environmental footprint?</h3>
            <div className="calculator-background">
                <div className="calculator-container">
                    <div className="row calculator-wrapper">
                        <div className="col question-container">
                            <div className="question-wrapper">
                                <h3>{qCount < 5 && <div style={{ fontWeight: 'bold' }}> Question {qCount + 1} of 5</div>}</h3>
                                <div className={`btn-group-toggle calculator-options ${qCount === 0 && "fade-in"}`} data-toggle="buttons">
                                    <p className="question">How would you describe your diet?</p>
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "1" ? "selected-option" : ""}`}>
                                        Meat in every meal
                                        <input type="radio" name="options" id="option1" value="3.3" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "1"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "2" ? "selected-option" : ""}`}>
                                        Meat in some meals
                                        <input type="radio" name="options" id="option2" value="2.5" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "2"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "3" ? "selected-option" : ""}`}>
                                        No beef
                                        <input type="radio" name="options" id="option3" value="1.9" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "3"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "4" ? "selected-option" : ""}`}>
                                        Vegetarian
                                        <input type="radio" name="options" id="option4" value="1.7" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "4"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "5" ? "selected-option" : ""}`}>
                                        Vegan
                                        <input type="radio" name="options" id="option5" value="1.5" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "5"} />
                                    </label><br />
                                </div>
                                <div className={`btn-group-toggle calculator-options ${qCount === 1 && "fade-in"}`} data-toggle="buttons">
                                    <p className="question">How many miles did you drive in the last year?</p>
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "1" ? "selected-option" : ""}`}>
                                        None
                                        <input type="radio" name="options" id="option1" value="0.2" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "1"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "2" ? "selected-option" : ""}`}>
                                        Less than 5,000
                                        <input type="radio" name="options" id="option2" value="0.9" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "2"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "3" ? "selected-option" : ""}`}>
                                        Between 5,000 and 10,000
                                        <input type="radio" name="options" id="option3" value="2.5" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "3"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "4" ? "selected-option" : ""}`}>
                                        More than 10,000
                                        <input type="radio" name="options" id="option4" value="3.7" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "4"} />
                                    </label><br />
                                </div>
                                <div className={`btn-group-toggle calculator-options ${qCount === 2 && "fade-in"}`} data-toggle="buttons">
                                    <p className="question">How many roundtrip flights have you taken in the last year?</p>
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "1" ? "selected-option" : ""}`}>
                                        None
                                        <input type="radio" name="options" id="option1" value="0.0" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "1"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "2" ? "selected-option" : ""}`}>
                                        One to two
                                        <input type="radio" name="options" id="option2" value="1.7" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "2"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "3" ? "selected-option" : ""}`}>
                                        Three to five
                                        <input type="radio" name="options" id="option3" value="4.5" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "3"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "4" ? "selected-option" : ""}`}>
                                        More than five
                                        <input type="radio" name="options" id="option4" value="6.1" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "4"} />
                                    </label><br />
                                </div>
                                <div className={`btn-group-toggle calculator-options ${qCount === 3 && "fade-in"}`} data-toggle="buttons">
                                    <p className="question">How much electricity is used in your household?</p>
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "1" ? "selected-option" : ""}`}>
                                        Between 1000 - 3000 kWh
                                        <input type="radio" name="options" id="option1" value="0.5" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "1"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "2" ? "selected-option" : ""}`}>
                                        Between 3000 - 5000 kWh
                                        <input type="radio" name="options" id="option2" value="1.1" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "2"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "3" ? "selected-option" : ""}`}>
                                        Between 5000 - 7000 kWh
                                        <input type="radio" name="options" id="option3" value="1.5" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "3"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "4" ? "selected-option" : ""}`}>
                                        More than 7000 kWh
                                        <input type="radio" name="options" id="option4" value="2.0" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "4"} />
                                    </label><br />
                                </div>
                                <div className={`btn-group-toggle calculator-options ${qCount === 4 && "fade-in"}`} data-toggle="buttons">
                                    <p className="question">How much do you spend on new non-essential physical goods each month?</p>
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "1" ? "selected-option" : ""}`}>
                                        Less than £150
                                        <input type="radio" name="options" id="option1" value="0.6" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "1"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "2" ? "selected-option" : ""}`}>
                                        Between £150 to £750
                                        <input type="radio" name="options" id="option2" value="2.4" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "2"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "3" ? "selected-option" : ""}`}>
                                        Between £750 to £1500
                                        <input type="radio" name="options" id="option3" value="6.1" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "3"} />
                                    </label><br />
                                    <label className={`btn btn-secondary question-option ${qChoice[qCount] === "4" ? "selected-option" : ""}`}>
                                        More than £1500
                                        <input type="radio" name="options" id="option4" value="8.6" autoComplete="off"
                                            onChange={handleChange}
                                            onClick={rightHandle} checked={qChoice[qCount] === "4"} />
                                    </label><br />
                                </div>
                                <div className={`results-wrapper ${qCount === 5 && "fade-in"}`}>
                                    <h3 style={{ fontSize: '2rem' }}><b>Your carbon<br />footprint is</b></h3>
                                    <h1 style={{ paddingTop: 20, paddingBottom: 0 }}><b style={{ fontSize: '4em', wordWrap: 'break-word' }}>{result}</b></h1>
                                    <h3 style={{ fontSize: '2rem', textAlign: 'center', padding: 0 }}><b>tonnes of<br />CO<sub>2</sub>e</b></h3>
                                    {<div className="message"><p>How do your emissions compare to the average?</p></div>}
                                    {result === 0 && <div className="not-possible" ><i>...are you really human?</i></div>}
                                </div>
                            </div>
                            <br />
                            {qCount > 0 &&
                                <button type="button" className="btn btn-light calc-button" style={{ position: 'absolute', left: 0, bottom: 0 }} onClick={leftHandle} title="Go back">
                                    <BsChevronLeft className="calculator-back-button-icon" title="Go back" />
                                </button>
                            }
                            {/*
                            {qCount < 5 ?
                                <button type="button" className="btn btn-light calc-button" disabled={!validateOption} style={{ height: '10%', position: 'absolute', right: 0, bottom: 0 }} onClick={rightHandle}>
                                    {qCount === 4 ? 'View Results' : 'Next'}
                                </button>
                                :
                                
                            }
                            */}
                            <div>
                                {(loggedIn && qCount > 4) &&
                                    <button type="button" className="btn btn-light calc-button" onClick={saveResults} style={{ height: '10%', position: 'absolute', right: 0, bottom: 0 }}>Save Results</button>

                                }
                            </div>
                        </div>
                        <div className="col info-container">
                            <div className="info-wrapper">
                                <div className={`col info-item ${qCount === 0 && "fade-in"}`}>
                                    <h5 className="info-title" style={{ fontWeight: 'bold' }}>Diet</h5>
                                    <div className="info-image-wrapper oranges" style={{textAlign: 'center'}}>
                                        <img src={Oranges} className="info-image" alt="Oranges" />
                                    </div>
                                    <p className="info-sub-title">Vegetarians do not eat meat or fish while vegans do not eat any food derived from animals</p>
                                    <p><b>Did You Know?</b> Animal agriculture is responsible for more greenhouse gas emissions than all transport combined and Avoiding meat and dairy is the single biggest way to reduce your impact on Earth!</p>
                                </div>
                                <div className={`info-item ${qCount === 1 && "fade-in"}`}>
                                    <h5 className="info-title" style={{ fontWeight: 'bold' }}>Miles Driven Per Year</h5>
                                    <div className="info-image-wrapper gauge" style={{textAlign: 'center'}}>
                                        <img src={Gauge} className="info-image" alt="Car gauge" />
                                    </div>
                                    <p className="info-sub-title">Across 13 countries, the average mileage per capita is 4,300 miles!</p>
                                    <p><b>Mileages Across the Globe:</b> The average mileage in the UK is 7,400 miles, in the US it is 13,500 miles, in Japan it is 2,500 miles, in Australia it is 6,700 miles, and in Germany it is 4,400 miles!</p>
                                </div>
                                <div className={`info-item ${qCount === 2 && "fade-in"}`}>
                                    <h5 className="info-title" style={{ fontWeight: 'bold' }}>Roundtrip Flights</h5>
                                    <div className="info-image-wrapper plane" style={{textAlign: 'center'}}>
                                        <img src={Plane} className="info-image" alt="Aeroplane" />
                                    </div>
                                    <p className="info-sub-title">Roundtrip flight - a flight to a destination and another flight back from that destination</p>
                                    <p><b>Did You Know?</b> Airbus has announced plans to have the first zero-emission aircraft by 2035, using hydrogen fuel cells!</p>
                                </div>
                                <div className={`info-item ${qCount === 3 && "fade-in"}`}>
                                    <h5 className="info-title" style={{ fontWeight: 'bold' }}>Electricity</h5>
                                    <div className="info-image-wrapper weather" style={{textAlign: 'center'}}>
                                        <img src={Weather} className="info-image" alt="Weather" />
                                    </div>
                                    <p className="info-sub-title">Clean electricity is 100% pollution-free, produced using naturally replenished and virtually inexhaustible sources like the sun and wind</p>
                                    <p><b>Electricity usage can be checked with your energy provider!</b> Find out how clean your electricity is <a className='calculator-link' href="https://www.epa.gov/egrid/power-profiler#/">here</a> if you live in the US, and <a className='calculator-link' href="https://www.uswitch.com/gas-electricity/guides/where-does-my-energy-come-from/"> here</a> in the UK! </p>
                                </div>
                                <div className={`info-item ${qCount === 4 && "fade-in"}`}>
                                    <h5 className="info-title" style={{ fontWeight: 'bold' }}>Spending Habits</h5>
                                    <div className="info-image-wrapper dvds" style={{textAlign: 'center'}}>
                                        <img src={Dvds} className="info-image" alt="DVDs" />
                                    </div>
                                    <p className="info-sub-title">This includes items like non-essential clothing, home furnishings, electronic goods, tobacco, etc.</p>
                                    <p><b>Did You Know?</b> Textile production contributes more to climate change than international aviation and shipping combined! Three out of five fast fashion items end up in a landfill!</p>
                                </div>
                                <div className={`info-item ${qCount === 5 && "fade-in"}`}>
                                    <h5 className="info-title" style={{ fontWeight: 'bold' }}>Carbon Footprint Insights</h5>
                                    {qCount === 5 && graphResults()}
                                    <p style={{ fontWeight: 'bold' }}>How does your carbon footprint compare with the global average?</p>
                                    {!loggedIn ?
                                        <div>
                                            <p>
                                                <a href="/sign-in" className='calculator-link'>Sign-in </a>
                                                or
                                                <a href="/sign-up" className='calculator-link'> sign-up </a>
                                                to save your results, or
                                                <a href="/actions" className='calculator-link'> take action </a>
                                                today to reduce your Carbon Footprint.
                                            </p>
                                        </div>
                                        :
                                        <div>
                                            <p>
                                                <a href="/actions" className='calculator-link'>Take action </a>
                                                today to reduce your Carbon Footprint.
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="progress-bar-wrapper">
                            <div className={`progress ${(qCount < 1 || qCount > 4) && "fade"}`}>
                                {/*progress-bar-striped?*/}
                                <div className="progress-bar bg-success progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={progVal}>
                                    {progVal.width}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="facts-wrapper">
                <div className="facts">
                    <Carousel indicators={false} controls={false} fade={true} interval={5000} style={{ margin: 40 }}>
                        <Carousel.Item>
                            <h5 style={{ fontWeight: 'bold' }}>Diet</h5>
                            <img src={Food} style={{ width: 400, padding: 30 }} alt="food" />
                            <p><b>Did you know?</b><br /> Food bought in restaurants has a wider footprint than food you buy to cook at home because of the overheads in the restaurants the emissions associated with heating, lighting and cooking for your meal. Food from takeaways has additional packaging and additional transport emissions, from the means of getting it from the restaurant to your home.</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h5 style={{ fontWeight: 'bold' }}>Flights</h5>
                            <img src={Flights} style={{ width: 400, padding: 30 }} alt="flights" />
                            <p><b>Did you know?</b><br /> Worldwide, flights produced 915 million tonnes of CO2 in 2019. Globally, humans produced over 43 billion tonnes of CO2 & In 2019, 4.5 billion passengers were carried by the world's airlines.</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h5 style={{ fontWeight: 'bold' }}>Electricity</h5>
                            <img src={Electricity} style={{ width: 400, padding: 30 }} alt="electricity" />
                            <p><b>Did you know?</b><br />19 million UK homes have poor levels of energy efficiency meaning that people are wasting energy and money heating the street around their home!</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h5 style={{ fontWeight: 'bold' }}>Production Process</h5>
                            <img src={Appliances} style={{ width: 300, padding: 30 }} alt="appliances" />
                            <p><b>Did you know? </b><br /> The production process for new household appliances (even efficient appliances) requires massive amounts of energy and resources. Reusing old ones also diverts waste from landfill.</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h5 style={{ fontWeight: 'bold' }}>Travel</h5>
                            <img src={Car} style={{ width: 300, padding: 40 }} alt="car" />
                            <p><b>Did you know ? </b><br /> CO2 emissions from passenger transport vary significantly depending on the transport mode. Passenger cars are a major polluter, accounting for 60.7% of total CO2 emissions from road transport in Europe. However, modern cars could be among the cleanest modes of transport if shared, rather being driven alone. With an average of 1.7 people per car in Europe, other modes of transport, such as buses, are currently a cleaner alternative.</p>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Calculator;