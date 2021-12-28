import React from 'react'
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import './user-profile.css'
import Bookmarks from '../../Pages/Bookmarks';
import CarbonFootprintHistory from '../../Pages/CarbonFootprintHistory';
import Settings from './Settings';
import ToDoList from '../../Pages/ToDoList';
import 'bootstrap/dist/css/bootstrap.css';

function UserProfileTabs (props) { 
    const user = props.user;
    return (
        <Tab.Container id="user-tab" defaultActiveKey="carbonFootprintHistory">

        <Row className="user-profile-row">
            <Col sm={3}>
            <Nav variant="pills" className="flex-column" style={{overflowY: 'hidden'}}>
                <Nav.Item>
                    <Nav.Link to="/CarbonFootprintHistory" eventKey="carbonFootprintHistory"> Carbon Footprint History </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link to= "/bookmarks" eventKey="Bookmarks"> Bookmarks </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link to= "/ToDoList" eventKey="To-Do-List"> Saved Actions </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link to= "/settings" eventKey="Settings"> Settings </Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>

            <Col sm={9}>
            <Tab.Content style={{overflowY: 'hidden'}}>
                <Tab.Pane eventKey="carbonFootprintHistory">
                    <CarbonFootprintHistory />
                </Tab.Pane>
                <Tab.Pane eventKey="Bookmarks">
                    <Bookmarks />
                </Tab.Pane>
                <Tab.Pane eventKey="To-Do-List">
                    <ToDoList />
                </Tab.Pane>
                <Tab.Pane eventKey="Settings">
                    <Settings user={user}/>
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Row>

        </Tab.Container>
    );
}

export default UserProfileTabs;
