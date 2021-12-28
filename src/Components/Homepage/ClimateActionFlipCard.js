import ReactCardFlip from 'react-card-flip';
import ca from '../../Images/ca.png';
import caText from '../../Images/caText.png';
import React, { Component } from 'react';

class ClimateActionFlipCard extends Component {
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
            <img src={ca} alt="Climate Action" className="sustainable-goal"></img>
            </div>
            
            <div onClick={this.handleClick}>
            <img src={caText} alt="Climate Action Summary" className="sustainable-goal"></img>
            </div>
            
            </ReactCardFlip>
        )
    }

}
export default ClimateActionFlipCard;