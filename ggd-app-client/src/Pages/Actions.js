import React, {Component} from 'react';
// import UserActions from '../Components/UserProfile/UserActions'
import { Tab, Nav, Row } from 'react-bootstrap';
//import ClimateActionList from '../Components/Actions/ClimateAction';
import LifeBelowWater from '../Components/Actions/LifeBelowWater';
import LifeOnLand from '../Components/Actions/LifeOnLand';
import '../Components/Actions/actions.css'
import { getAllActions } from '../Components/Actions/ActionAPI';
import { getUserActions } from '../Components/UserProfile/UserAPI';
import ClimateAction from '../Components/Actions/ClimateAction';
class Actions extends Component {
    async componentDidMount() {
        try {
            const responseActions = await getAllActions();
            const responseUserActions = await getUserActions();
            const responseUserFavourites = await getUserActions();
            var climate = [], water = [], land = [];
            for (var i=0; i<responseActions.length; i++) {
                if(responseActions[i].section==="Climate-Action" && responseActions[i].createdBy === "ggd") {
                    climate.push(responseActions[i]);
                } else if(responseActions[i].section==="Life-On-Land" && responseActions[i].createdBy === "ggd") {
                    land.push(responseActions[i]);
                } else if(responseActions[i].section==="Life-Below-Water" && responseActions[i].createdBy === "ggd") {
                    water.push(responseActions[i]);
                }
            }
            this.setState({
                climateActions: climate,
                waterActions: water,
                landActions: land,
                favourites: responseUserFavourites,
                actions: responseUserActions
            });
        } catch (error) {
            this.setState({ apiError: "Could not find any Actions"});
        }
    }
    state = {
        actions: [],
        climateActions: [],
        waterActions: [],
        landActions: [],
        favourites: [],
    };

    render() {
    const { climateActions, waterActions, landActions, favourites, actions} = this.state;
    return (
        <div className= "main">           
            <Tab.Container id="action-tab" defaultActiveKey="Climate-Action">
                <Row className="user-actions-row"> 
                    <Row sm={8}> 
                    <Nav variant="pills" style={{fontSize: '30px', justifyContent: 'center', paddingTop:'30px'}} className="flex-row">
                        <Nav.Item>
                            <Nav.Link to="/ClimateAction" eventKey="Climate-Action" style ={{color: 'rgb(63, 126, 68)'}}> Climate Action</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link to= "/LifeBelowWater" eventKey="Life-Below-Water" style ={{color: '#0a97d9'}}>Life Below Water</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link to= "/LifeOnLand" eventKey="Life-On-Land" style ={{color: '#55c02b'}}>Life On Land</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Row>
                    <Row sm={9}> 
                    <Tab.Content>
                        <Tab.Pane eventKey="Climate-Action">
                            <ClimateAction climate={climateActions} favourites={favourites} actions={actions} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="Life-Below-Water">
                            <LifeBelowWater water={waterActions} favourites={favourites} actions={actions}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Life-On-Land">
                            <LifeOnLand land={landActions} favourites={favourites} actions={actions}/>
                        </Tab.Pane>
                    </Tab.Content>
                    </Row>
                </Row> 
            </Tab.Container>
            {/* <h3 className ="heading" style ={{marginTop:'30px'}}>Here's what you have sought out to do:</h3>
            <UserActions /> */}
        </div>
    );
}
}
export default Actions;