import React, { Component } from 'react';
import { getUserActions } from './UserAPI';
import ActionList from './ActionList';
import '../Actions/actions.css';

class UserActions extends Component {
    async componentDidMount() {
        try {
            const responseActions = await getUserActions();
            this.setState({userActions: responseActions});
        } catch (error) {
            this.setState({ apiError: "Could not find any Actions"});
        }
    }
    state = {
        userActions: [],
        apiError: "",
    };

    render () {
        const { userActions, apiError } = this.state;
        return (
            <div className="main" >
                <div className="user-action">
                <h4 style={{paddingTop: 30, paddingBottom: 10, fontWeight: 'bold', textAlign: 'center'}}> Your saved actions: </h4>
                    <l1>{userActions.length >= 1 && 
                    <ActionList  
                    actions={userActions} 
                    />}
                    </l1>
                    {userActions.length <= 0 && <h6 style ={{padding: 20, textAlign: 'center'}}>It looks like you haven't started adding any actions to your to-do list</h6>} 
                    {apiError && <p>Could not fetch any actions.</p>}
                </div>
            </div>
        )
    }
}

export default UserActions