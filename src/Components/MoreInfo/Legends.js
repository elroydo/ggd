import React from "react";
import './more-info.css';

const Legend = (props) => {
    const minVal = props.values.minVal, maxVal = props.values.maxVal, range = props.values.maxVal/6, results = [];
    
    for(var i = 0; i<maxVal; i+=range) {
        results.push(i.toFixed(0));
    }

    return (
        <div className="map-key">
            <div className="key key-label">Co<sub>2</sub> emissions</div>
            <div className="key key-one" style={{ backgroundColor: "#3ac21f" }}>{minVal} - {results[1]-1}</div>
            <div className="key key-two" style={{ backgroundColor: "#4ae088" }}>{results[1]} - {results[2]-1}</div>
            <div className="key key-three" style={{ backgroundColor: "#ffe863" }}>{results[2]} - {results[3]-1}</div>
            <div className="key key-five" style={{ backgroundColor: "#ff7247" }}>{results[3]} - {results[4]-1}</div>
            <div className="key key-six" style={{ backgroundColor: "#ff4747" }}>{results[4]} - {(maxVal+1).toFixed(0)}</div>
        </div>
    );
};

export default Legend;
