import ReactCardFlip from 'react-card-flip';
import lbw from '../../Images/lbw.png';
import lbwText from '../../Images/lbwText.png';
import React, { Component } from 'react';

class LifeBelowWaterFlipCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
            <div onClick={this.handleClick}>
            <img src={lbw} alt="Life Below Water" className="sustainable-goal"></img>
            </div>
            
            <div onClick={this.handleClick}>
            <img src={lbwText} alt="Life Below Water Summary" className="sustainable-goal"></img>
            </div>
            
            </ReactCardFlip>
        )
    }

}
export default LifeBelowWaterFlipCard;