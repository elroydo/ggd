import ReactCardFlip from 'react-card-flip';
import lol from '../../Images/lol.png';
import lolText from '../../Images/lolText.png';
import React, { Component } from 'react';

class LifeOnLandFlipCard extends Component {
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
            <img src={lol} alt="Life On Land" className="sustainable-goal"></img>
            </div>
            
            <div onClick={this.handleClick}>
            <img src={lolText} alt="Life On Land Summary" className="sustainable-goal"></img>
            </div>
            
            </ReactCardFlip>
        )
    }

}
export default LifeOnLandFlipCard;