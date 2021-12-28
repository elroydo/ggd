import React, { useState, useRef, useEffect } from 'react';
import { VectorMap } from "react-jvectormap";
import '../Components/MoreInfo/more-info.css';
import '../Components/MoreInfo/globe.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import mapData from '../Components/MoreInfo/mapData.json'
import { Link } from "react-router-dom";
import Graph1 from '../Components/MoreInfo/Graph/Graph1'
import Graph2 from '../Components/MoreInfo/Graph/Graph2'
import Graph3 from '../Components/MoreInfo/Graph/Graph3'
import Graph4 from '../Components/MoreInfo/Graph/Graph4'
import Legend from '../Components/MoreInfo/Legends';

const MoreInfo = () => {
    var jVectorMap = useRef(null); //declare and initialise variable to use ref null
    const
        [year, setYear] = useState(2019),
        [scaleValues, setScaleValues] = useState({
            minVal: 0,
            maxVal: 0
        });

    useEffect(() => { //set initial min and max values on component load
        setScaleValues({
            minVal: jVectorMap.current.$mapObject.series.regions[0].scale.clearMinValue,
            maxVal: jVectorMap.current.$mapObject.series.regions[0].scale.clearMaxValue
        });
    }, [year]);

    const handleHover = (event, label, code) => {
        var val = year;
        label.html(label.html() + '<br/>CO<sub>2</sub> emissions: ' + mapData.countries[val][code] + 'T'); //fetch and display country emission data from mapData json files as a label
    }

    const handleChage = (event) => {
        setScaleValues({
            minVal: jVectorMap.current.$mapObject.series.regions[0].scale.clearMinValue,
            maxVal: jVectorMap.current.$mapObject.series.regions[0].scale.clearMaxValue
        });
        setYear(event.target.value); //set the value of slider to state of year variable
    }

    return (
        <div className="main" >
            <h2 className="page-heading" style={{ fontSize: '2.5rem', fontWeight: 'bold', paddingTop: 30 }}> Want to learn more? </h2>
            <div className="map-container" style={{ paddingTop: 30, margin: '0 auto' }}>
                <div className="map-wrapper" style={{ width: '85%', height: '35vw', margin: '0 auto' }}>
                    <VectorMap ref={jVectorMap} map={'world_mill'} //set to display the world map
                        zoomOnScroll={false} //disable zoom on scroll functionality
                        zoomButtons={false} //disable zoom buttons
                        backgroundColor="#fff"
                        containerStyle={{
                            width: '100%',
                            height: '100%'
                        }}
                        series={{
                            regions: [{
                                values: mapData.countries[year], //fetches the data from mapData json file based on the year manipulated by the slider element
                                scale: ['#3ac21f', '#4bd150', '#4ae088', '#ffe863', '#ffc533', '#ff7247', '#ff5a3d', '#ff4747'], //displays a range of colours based on the minimum and maximum values present within the json file
                                normalizeFunction: 'polynomial' //normalise the data as polynomial and display as scaled colours
                            }],
                        }}
                        regionStyle={{
                            initial: {
                                fill: '#009664'
                            },
                            hover: {
                                "fill-opacity": 0.7,
                                cursor: 'pointer'
                            }
                        }}
                        onRegionTipShow={handleHover} //upon the user hovering over a country, call the handleHover function
                    />
                </div>
                <div className="map-key-wrapper">
                    <Legend values={scaleValues} />
                </div>
                <form className="slider-container" style={{ textAlign: 'center' }}>
                    <div className="slider-year" style={{ fontSize: '1.1rem' }}>CO<sub>2</sub> emissions in <b>{year}</b>, measured in T (metric tonnes)</div>
                    <input className="slider-bar" type="range" min="1950" max="2019" defaultValue='2019' onInput={handleChage} style={{ width: '50%', color: 'green' }} />
                </form>
            </div>

            <div className="lower-more-info-container">
                <div className="row">
                    <div className="col lower-element">
                        <div className='graph-container'>
                            <div style={{ borderRadius: 30, margin: '0 auto' }}>
                                <Carousel
                                    indicators={true}
                                    controls={true}
                                    nextIcon={""}
                                    prevIcon={""}
                                    nextLabel={<button className="btn btn-outline-success news-button news-button-right" style={{ position: 'absolute', top: 0, left: 0, borderRadius: "50%" }} type="button">&#10148;</button>}
                                    prevLabel={<button className="btn btn-outline-success news-button news-button-left" style={{ position: 'absolute', top: 0, right: 0, borderRadius: "50%" }} type="button">&#10148;</button>}
                                    fade={true}
                                    interval={5000}>
                                    <Carousel.Item className="more-info-carousel-item">
                                        <Graph1 />
                                    </Carousel.Item>
                                    <Carousel.Item className="more-info-carousel-item">
                                        <Graph2 />
                                    </Carousel.Item>
                                    <Carousel.Item className="more-info-carousel-item">
                                        <Graph3 />
                                    </Carousel.Item>
                                    <Carousel.Item className="more-info-carousel-item">
                                        <Graph4 />
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>

                    <div className="col lower-element">
                        <div classname="row">
                            <h3 style={{ paddingBottom: 10 }}> Want to take action against Climate Change? </h3>
                        </div>
                        <div classname="row">
                            <div className="globe-container">
                                <div className="globe">
                                    <div className="circle circle-zero"></div>
                                    <div className="circle circle-one"></div>
                                    <div className="circle circle-two"></div>
                                    <div className="circle circle-three"></div>
                                    <div className="circle circle-four"></div>
                                    <div className="circle circle-five"></div>
                                    <div className="circle circle-six"></div>
                                </div>
                            </div>
                        </div>

                        <div classname="row">
                            <div>
                                <Link to="/Actions" className="btn btn-light more-info-button">Take Action - View a List of Actions to take</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreInfo;
